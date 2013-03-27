<?php
    $errors = '';
    $myemail = 'jure.bergant@gmail.com';//<-----Put Your email address here.
    if(empty($_POST['kontakt_sporocilo']))
    {
        //$errors .= "\n Error: all fields are required";
        $errors .= "kontakt_sporocilo|Vnesite sporočilo.\n";
    }

    $sporocilo = $_POST['kontakt_sporocilo'];
    $from_email = $_POST['kontakt_email'];

    if (!empty($from_email) && !preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",$from_email))
    {
        //$errors .= "\n Error: Invalid email address";
        $errors .= "kontakt_email|Neveljaven e-naslov.\n";
    }

    if( empty($errors))
    {
        $to = $myemail;
        $email_subject = "Sporočilo s spletne strani IDK";
        $email_body =    "E-naslov: $from_email\n".
                         "Sporocilo: \n $sporocilo";
        $headers =       "From: $myemail\n";
        $headers .=      "Reply-To: $from_email";
        mail($to,$email_subject,$email_body,$headers);

        $errors = '';
    }
?>

<?php
echo $errors;
//if ($errors != '')
//{
//    echo nl2br($errors);
//}
//else
//{
//    echo '';
//}
?>