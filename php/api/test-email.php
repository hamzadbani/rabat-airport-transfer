<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple test endpoint
echo json_encode([
    'status' => 'OK',
    'message' => 'API PHP fonctionne correctement',
    'mailhog' => 'http://localhost:8026 pour voir les emails'
]);
?>
