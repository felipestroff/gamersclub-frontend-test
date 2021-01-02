<?php

if (!empty($_FILES['avatar'])) {
    $avatar = $_FILES['avatar'];

    move_uploaded_file($avatar['tmp_name'], './uploads/avatars/' . $avatar['name']);

    echo json_encode($avatar);
}
else {
    echo 'Nenhuma informação recebida via POST';
}

?>