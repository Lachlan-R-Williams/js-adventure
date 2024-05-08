<?php include 'C:/laragon/www/js-adventure/secret/api.inc.php'; // Calls the secret php file containing the API key.

// Moves the API key varible to a new PHP variable.
$phpVariable = $OWMAPIkey;

// Encodes the PHP varible in JSON via echo.
echo json_encode($phpVariable);
?>