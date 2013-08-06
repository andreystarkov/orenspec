<?php

// Change these two variables to meet your needs.

$myemail = 'filonov@orenspec.com';
$subject = 'orenspec.com';
 
 
    $name = stripslashes($_POST[name]);
    $email = stripslashes($_POST[email]);
    $text = stripslashes($_POST[text]);
    $referer = $_POST[referer];
    $remote_host = $_SERVER[REMOTE_ADDR];
    $server = $_SERVER[SERVER_NAME];
    $browser = $_SERVER[HTTP_USER_AGENT];

	
    if(!$email) 
    {
        $status .= "No back.<br>";
    }

// setcookie("nospam", "", time()-3600);

if($_COOKIE['nospam'] == ""){
    if(!$status)
    {
        $header = "From: $email\r\nReply-To: $email\r\n";

		$message = "
		Имя отправителя: $name
		Обратная связь: $email

		$text
					
		--- 

		IP: $remote_host
		CL: $browser
		";

        if(mail($myemail, $subject, $message, $header)){
            $status = "Thank you for your Feedback!!<br><br>";
			setcookie("nospam", $remote_host, time()+500);  
        } else {
            $status = "There was a problem sending your feedback, please try again later.<br><br>";
        }

    }
    else
    {
        $status .= "<br>Please press <u>back</u> on your browser to resubmit.<br><br>";
    }
	$current = "<br><br>name: ".$name."<br>back: ".$email."<br><br>text: ".$text."<br><br><br>current: ".$current."<br><br><hr>".$_COOKIE['sent'];

} else 
$current = "Cookie = ".$_COOKIE['nospam'];
$file = 'debug.html';
// Open the file to get existing content

// Append a new person to the file

// Write the contents back to the file
file_put_contents($file, $current);
// Now check the referer page and ensure it's a proper URL

$referer = $_SERVER[HTTP_REFERER];

if(!preg_match('#^http://[a-z0-9-]+.([a-z0-9-]+.)?[a-z]+#i', $referer))
{
    unset($referer);
}
