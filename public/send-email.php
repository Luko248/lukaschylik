<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $extraField = $_POST['extraField'] ?? '';
    $fullname = $_POST['fullname'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Honeypot check - if extraField is filled, it's likely a bot
    if (!empty($extraField)) {
        // Bot detected, redirect back to the site without sending email
        header("Location: /#contact?status=error&message=spam");
        exit;
    }
    
    // Validate required fields
    if (empty($fullname) || empty($email) || empty($subject) || empty($message)) {
        header("Location: /#contact?status=error&message=missing");
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: /#contact?status=error&message=invalid_email");
        exit;
    }
    
    // Recipient email
    $to = "chylik.lukas@gmail.com";
    
    // Email subject
    $email_subject = "Contact Form: $subject";
    
    // Email content
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $fullname\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success
        header("Location: /#contact?status=success");
    } else {
        // Error
        header("Location: /#contact?status=error&message=send_failed");
    }
    
    exit;
}

// If someone tries to access this file directly, redirect to the homepage
header("Location: /");
exit;
?>