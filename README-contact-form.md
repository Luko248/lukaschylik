# Contact Form Implementation

This document explains the implementation of the contact form with PHP email functionality.

## How It Works

The contact form is implemented using:

1. A Qwik component (`src/sections/contact/contact.tsx`) that renders the form
2. A PHP script (`public/send-email.php`) that processes the form submission and sends an email

The form includes a honeypot trap to prevent spam submissions. The first field (`extraField`) is hidden from users but can be filled by bots. If this field is filled, the form submission is discarded.

## Form Submission Flow

1. User fills out the form and submits it
2. The form is submitted to `/send-email.php` via POST method
3. The PHP script validates the form data and checks the honeypot field
4. If validation passes, the script sends an email to chylik.lukas@gmail.com
5. The script redirects back to the contact section with a success or error message
6. The Qwik component displays the appropriate message based on URL parameters

## Important Note: GitHub Pages Limitation

**GitHub Pages does not support PHP or any server-side languages.** It only serves static content (HTML, CSS, JavaScript, images, etc.).

This means that if you deploy this site to GitHub Pages, the PHP script will not work, and the form will not be able to send emails.

## Alternative Solutions

If you want to deploy to GitHub Pages, you have several options:

### 1. Use a Form Submission Service

Services like Formspree, FormSubmit, or Netlify Forms can handle form submissions without requiring server-side code.

Example with Formspree:

```jsx
<form action="https://formspree.io/f/your-form-id" method="POST">
  <!-- Form fields -->
</form>
```

### 2. Use a Serverless Function

You can create a serverless function (AWS Lambda, Netlify Functions, Vercel Serverless Functions) to handle the form submission.

### 3. Host the PHP Script Separately

You can host the PHP script on a separate server that supports PHP and point the form action to that server.

### 4. Use a Different Hosting Provider

If you need PHP support, consider using a hosting provider that supports PHP, such as:

- Shared hosting (Bluehost, HostGator, etc.)
- VPS (DigitalOcean, Linode, etc.)
- PaaS (Heroku, Platform.sh, etc.)

## Conclusion

The current implementation works well if you're hosting on a server that supports PHP. If you're using GitHub Pages, you'll need to use one of the alternative solutions mentioned above.
