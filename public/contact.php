<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit();
}

$name = strip_tags(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(trim($data['phone'] ?? ''));
$serviceType = strip_tags(trim($data['serviceType'] ?? ''));
$message = strip_tags(trim($data['message'] ?? ''));

if (empty($name) || empty($email) || empty($serviceType) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
    exit();
}

// Configuration
$to_email = 'em.taxi.maroc@gmail.com';
$from_email = 'no-reply@em-taxi.ma'; // Use a domain-based email for Hostinger
$whatsapp_number = '212762728706'; // Fixed format (212 + 9 digits)
$site_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
$logo_url = $site_url . '/logo.png';

// Construct HTML Email
$subject = "Nouvelle réservation - $serviceType - EM Taxi Touristique";
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?="; // Encoding subject for UTF-8

$email_content = "
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; }
        .header { background: #1a1a1a; padding: 20px; text-align: center; }
        .header img { max-width: 150px; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #ff6b35; display: block; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; }
        .value { font-size: 16px; background: #f9f9f9; padding: 10px; border-radius: 5px; }
        .footer { background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='$logo_url' alt='EM Taxi Touristique'>
        </div>
        <div class='content'>
            <h2 style='text-align: center; color: #1a1a1a;'>Nouvelle Demande de Service</h2>
            
            <div class='field'>
                <span class='label'>Nom complet</span>
                <div class='value'>$name</div>
            </div>
            
            <div class='field'>
                <span class='label'>Email</span>
                <div class='value'>$email</div>
            </div>
            
            <div class='field'>
                <span class='label'>Téléphone</span>
                <div class='value'>" . ($phone ?: 'Non fourni') . "</div>
            </div>
            
            <div class='field'>
                <span class='label'>Type de Service</span>
                <div class='value'>$serviceType</div>
            </div>
            
            <div class='field'>
                <span class='label'>Message</span>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            Cet email a été envoyé depuis le formulaire de contact de EM Taxi Touristique.
        </div>
    </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: EM Taxi Site <$from_email>" . "\r\n";
$headers .= "Reply-To: $name <$email>" . "\r\n";
$headers .= "Return-Path: $from_email" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$mail_success = mail($to_email, $subject, $email_content, $headers, "-f $from_email");

if ($mail_success) {
    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès !'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'envoi de l\'email.'
    ]);
}
?>