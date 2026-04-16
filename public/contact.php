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

function h($s)
{
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

$name = strip_tags(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(trim($data['phone'] ?? ''));
$serviceType = strip_tags(trim($data['serviceType'] ?? ''));
$flightNumber = strip_tags(trim($data['flightNumber'] ?? ''));
$dateCourse = strip_tags(trim($data['dateCourse'] ?? ''));
$dateArriver = strip_tags(trim($data['dateArriver'] ?? ''));
$adultsCount = max(1, min(50, (int) ($data['adultsCount'] ?? 1)));
$childrenCount = max(0, min(20, (int) ($data['childrenCount'] ?? 0)));
$baggage = strip_tags(trim($data['baggage'] ?? ''));
$message = strip_tags(trim($data['message'] ?? ''));

if (empty($name) || empty($email) || empty($serviceType) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
    exit();
}

// Configuration
$to_email = 'Taxi.toursrabat@gmail.com';
$from_email = 'no-reply@taxirabatairoport.com';
$site_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
$logo_url = $site_url . '/assets/new-logo-taxi-rabat-removebg-preview.png';

// Construct HTML Email
$subject = "Nouvelle réservation - $serviceType - Rabat Transfert Aéroport";
$subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

$hn = h($name);
$he = h($email);
$hp = $phone !== '' ? h($phone) : 'Non fourni';
$hf = $flightNumber !== '' ? h($flightNumber) : 'Non fourni';
$hd = $dateCourse !== '' ? h($dateCourse) : 'Non fourni';
$ht = $dateArriver !== '' ? h($dateArriver) : 'Non fourni';
$hs = h($serviceType);
$hba = $baggage !== '' ? h($baggage) : 'Non fourni';
$hm = $message !== '' ? nl2br(h($message)) : 'Non fourni';

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
        .label { font-weight: bold; color: #0d9488; display: block; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; }
        .value { font-size: 16px; background: #f9f9f9; padding: 10px; border-radius: 5px; }
        .footer { background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <img src='$logo_url' alt='Rabat Transfert Aéroport'>
        </div>
        <div class='content'>
            <h2 style='text-align: center; color: #1a1a1a;'>Nouvelle réservation</h2>

            <div class='field'>
                <span class='label'>Nom complet</span>
                <div class='value'>$hn</div>
            </div>

            <div class='field'>
                <span class='label'>Email</span>
                <div class='value'>$he</div>
            </div>

            <div class='field'>
                <span class='label'>Téléphone</span>
                <div class='value'>$hp</div>
            </div>

            <div class='field'>
                <span class='label'>Numéro de vol</span>
                <div class='value'>$hf</div>
            </div>

            <div class='field'>
                <span class='label'>Date du trajet</span>
                <div class='value'>$hd</div>
            </div>

            <div class='field'>
                <span class='label'>Heure (arrivée / prise en charge)</span>
                <div class='value'>$ht</div>
            </div>

            <div class='field'>
                <span class='label'>Type de service</span>
                <div class='value'>$hs</div>
            </div>

            <div class='field'>
                <span class='label'>Passagers adultes</span>
                <div class='value'>$adultsCount</div>
            </div>

            <div class='field'>
                <span class='label'>Enfants</span>
                <div class='value'>$childrenCount</div>
            </div>

            <div class='field'>
                <span class='label'>Bagages</span>
                <div class='value'>$hba</div>
            </div>

            <div class='field'>
                <span class='label'>Message</span>
                <div class='value'>$hm</div>
            </div>
        </div>
        <div class='footer'>
            Cet email a été envoyé depuis le formulaire de contact de Rabat Transfert Aéroport.
        </div>
    </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Rabat Transfert Aéroport Site <$from_email>" . "\r\n";
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
