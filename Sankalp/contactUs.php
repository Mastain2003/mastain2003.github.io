<?php
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\SMTP;
        use PHPMailer\PHPMailer\Exception;
        
		date_default_timezone_set('Asia/Kolkata');
		require 'PHPMailer/src/Exception.php';
		require 'PHPMailer/src/PHPMailer.php';
		require 'PHPMailer/src/SMTP.php';
		/*$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;
		$mail->SMTPSecure = 'tls';
		$mail->SMTPAuth = true;
		$mail->Username = "prakharmastain9@gmail.com";
		$mail->Password = "zywznxjgttrtoussx";*/

		$mail = new PHPMailer();
		$mail->IsSMTP();               // set mailer to use SMTP
		$mail->Host = "mail.mastain.xyz";  // specify main and backup server or localhost
		$mail->Port = 587;
		$mail->SMTPAuth = true;     // turn on SMTP authentication
		$mail->Username = "admin@mastain.xyz";  // SMTP username
		$mail->Password = "2003@PraYoug"; // SMTP password
		//$mail->From = $mail->Username;	//Default From email same as smtp user
		//$mail->FromName = "Sankalp Hospital";
		$mail->setFrom('admin@mastain.xyz', 'SANKALP HOSPITAL'); // Set the sender of the message.
		$mail->addBCC('prakharmastain9@gmail.com','Prakhar Mastain');
		//$mail->addAddress("prakharmastain9@gmail.com","Prakhar"); // Set the recipient of the message.

		//$mail->AddAddress("prakharmastain9@gmail.com", "Prakhar Mastain"); //Email address where you wish to receive/collect those emails.

		//$mail->WordWrap = 50;                                 // set word wrap to 50 characters
		//$mail->IsHTML(true);                                  // set email format to HTML
		//$mail->Subject ="testing";
		//$message = "Name of the requestor :".$_POST['fullname']." \r\n <br>Email Adrress :".$_POST['email']." \r\n <br> Query :".$_POST['query'];
		//$mail->Body    = $message;

	   	if($_SERVER['REQUEST_METHOD']=="GET"&&$_GET['submit']=="queryFormSubmit"){
			$name =isset($_GET['name'])?ucwords(strtolower(htmlspecialchars($_GET['name']))):"";
			$email =isset($_GET['email'])?htmlspecialchars($_GET['email']):"";
			$query =isset($_GET['query'])?ucfirst(htmlspecialchars($_GET['query'])):"";
			$ret  = array('status'=>true,'msg'=>array('name'=>"",'email'=>"",'query'=>"",'result'=>"Success"));
			//$name = $email = $query ="";
			if($name==""){
				$ret['status']=false;
				$ret['msg']['name'] ="This Field Can not be Empty";
			}
			if($email==""||!preg_match("/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/", $email)){
				$ret['status']=false;
				$ret['msg']['email'] ="Enter A Valid Email Address";
			}
			if($query==""){
				$ret['status']=false;
				$ret['msg']['query'] ="This Field Can not be Empty";
			}
			if(!$ret['status']){
				print_r(json_encode($ret));
				exit;
			}
			else{
	           // $ret = array('status' => true,'msg'=>array("result"=>"Your request is submitted successfully. I will get back to you soon."));
	            $time = date(" H:i:s, l, jS F Y");
	            $siteUrl = "https://www.mastain.xyz/";
	            $str = "<html><head><style>*{margin:0;padding:0;box-sizing:border-box}header,footer{height: 2rem;text-align: center}footer{background-color: #1E90FF}div{position:relative;padding:2%}img{max-height: 100%}table{max-width:90%;margin:auto;border-spacing:0}tr{background-color:gray}tr:nth-child(even){background-color:darkgray}td{vertical-align:top;padding:5px}td:nth-child(1){white-space:nowrap;font-weight:bolder}</style></head><body><header><img src='".$siteUrl."img/logo.png' srcset='".$siteUrl."img/logo.png'>
		</header><div><h2>Hey, $name</h2><p>Your Request is Submitted successfully. I will get back to you soon if necessary.<br/>Here is your summary of Request<br/><br/></p><table><tr><td>Name</td><td>:</td><td>$name</td></tr><tr><td>Email id</td><td>:</td><td>$email</td></tr><tr><td>Time</td><td>:</td><td>$time</td></tr><tr><td>Content</td><td>:</td><td>$query</td></tr></table><br/><br/></div><footer><p>Please Visit Us Again  on <a href='".$siteUrl."'>".$siteUrl."</a></p></footer></body></html>";
		    $mail->addAddress($email, $name);
		    $mail->Subject="Query Submitted";
	            //$mail->Body    = $str;
	            /*$mail->setFrom('No-reply@prayoug.epizy.com', 'Prayoug'); // Set the sender of the message.
		        $mail->addAddress($email, $name); // Set the recipient of the message.
		        $mail->Subject = 'Feedback Submitted'; // The subject of the message.*/
				
		        $mail->msgHTML($str);
		        // Optional when using HTML: Set an alternative plain text message for email clients who prefer that.
		        $mail->AltBody = $text;
	        	// Choose to send either a simple text email...
		        //$mail->Body = $feedback; // Set a plain text body.*/
	            if ($mail->send()) {
		           $ret = array('status' => true,'msg'=>array("result"=>"Your request is submitted successfully. I will get back to you soon."));
		        } else {
	                $ret = array('status' => true,'msg'=>array("result"=>"Mailer Error: " . $mail->ErrorInfo));
		        }
			}
		}
		else{
			$ret = array('status' => true,'msg'=> array('result'=>"Due to irrelavent method or source currently we can't submit your data. Please try after some time or reload the page."));
		}
		print_r(json_encode($ret));
?>