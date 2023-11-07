<?php
	session_start();
	
	$file = "visitorCount.txt";
	if(!file_exists($file)){
		$handle = fopen($file,'w');
		fwrite($handle,"0");
		fclose($handle);
	}

	$handle = fopen($file,'r');
	if(!$handle){
		echo "document.getElementById('visitorNo').lastElementChild.innerHTML = 'Currently Visitor Counter is working'";
	}
	else{
		$count = (int)fread($handle,filesize($file));
		fclose($handle);

		if(!isset($_SESSION['visited'])){
			$count++;
			$_SESSION['visited']="yes";
			$handle = fopen($file,'w');
			fwrite($handle,$count);
			fclose($handle);
		}	
		echo "document.getElementById('visitorNo').lastElementChild.innerHTML = 'You are $count"."<sup>th</sup> guest in my room'";	
	}
?>