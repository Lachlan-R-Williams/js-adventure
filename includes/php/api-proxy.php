<?php
  include 'C:/laragon/www/js-adventure/secret/api.inc.php'; // Get API key securely
  $lat = $_GET['lat'] ?? null;
  $lon = $_GET['lon'] ?? null;

  if (!$lat || !$lon) {
    echo json_encode(['error' => 'Missing coordinates']);
    exit;
  }

  $url = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$OWMAPIkey";
  $weather = file_get_contents($url);

  echo $weather;
?>
