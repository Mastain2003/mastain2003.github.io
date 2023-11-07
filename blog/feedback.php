<?php
	date_default_timezone_set('Asia/Kolkata');
	require 'PHPMailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587;
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;
	$mail->Username = "prakharmastain9@gmail.com";
	$mail->Password = "zywznxjgttrtousx";
   if($_SERVER['REQUEST_METHOD']=="POST"&&$_REQUEST['submit']=="feedbackForm"){
		$name =isset($_POST['name'])?ucwords(strtolower(htmlspecialchars($_POST['name']))):"";
		$email =isset($_POST['email'])?htmlspecialchars($_POST['email']):"";
		$feedback =isset($_POST['feedback'])?ucfirst(htmlspecialchars($_POST['feedback'])):"";
		if($name==""||$email==""||$feedback=="")
			$ret = array('status' => 1,"response"=>"All fields are necessary");
		else if(!preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $email)){
			$ret = array('status' => true,"response"=>"Please Provide a valid Email address");
		}
		else{
            $ret = array('status' => false,"response"=>"Thank you $name for feedback. I will get back to you soon");
            $time = date(" H:i:s, l, jS F Y");
            $siteUrl = "http://prayoug.epizy.com/";
            $str = "<html><head><style>*{margin:0;padding:0;box-sizing:border-box}header,footer{padding-left:1%;min-height:2rem;position:relative;background-color:black;color:white}div{position:relative;padding:2%}img{height:10vmin;margin:auto;display:table}table{max-width:90%;margin-left:5%;border-spacing:0}tr{background-color:gray}tr:nth-child(even){background-color:#a9a9a9}td{vertical-align:top;padding:5px}td:nth-child(1){white-space:nowrap;font-weight:bolder}</style></head><body><header><h1>From : Prakhar Mastain | Blog</h1></header><div><img src='".$siteUrl."img/defaults/logo.svg'><h2>Hey, $name</h2><p>Thank you for your valuable feedback i will get back to you soon if necessary.<br/>Here is your summary of feedback<br/><br/></p><table><tr><td>Name</td><td>:</td><td>$name</td></tr><tr><td>Email id</td><td>:</td><td>$email</td></tr><tr><td>Time</td><td>:</td><td>$time</td></tr><tr><td>Content</td><td>:</td><td>$feedback</td></tr></table><br/><br/><p>Please Visit Again</p><br/><br/></div><footer><p>Visit me on <a href='$siteUrl'>$siteUrl</a></p></footer></body></html>";
            $text = "Hey $name,\nThank you for your valuable feedback i will get back to you soon if necessary.\nHere is your summary of feedback\n\nName : $name\nEmail : $email\nTime : $time\nContent : $feedback\n\n\nPlease visit again on $siteUrl";

            $mail->setFrom('No-reply@prayoug.epizy.com', 'Prayoug'); // Set the sender of the message.
	        $mail->addAddress($email, $name); // Set the recipient of the message.
	        $mail->Subject = 'Feedback Submitted'; // The subject of the message.

	        $mail->msgHTML($str);
	        // Optional when using HTML: Set an alternative plain text message for email clients who prefer that.
	        $mail->AltBody = $text;
        	// Choose to send either a simple text email...
	        //$mail->Body = $feedback; // Set a plain text body.
            if ($mail->send()) {
	           $ret = array('status' => false,"response"=>"Thank you $name for feedback. I will get back to you soon");
	        } else {
                $ret = array('status' => true,"response"=>"Mailer Error: " . $mail->ErrorInfo);
	        }
			
		}
	
	}
	else{
		$ret = array('status' => true,"response"=>"Due to irrelavent method or source currently we can't submit your data. Please try after some time or reload the 
                        page.");
	}
	print_r(json_encode($ret));
	// Optional: attach a file
	//$mail->addAttachment('images/phpmailer_mini.png');
?>	