<?php

// defined('BASEPATH') OR exit('No direct script access allowed');
// Verifica se os dados do formulário foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["filme_id"], $_POST["usuario_nome"], $_POST["comentario"])) {
    // Recebe os dados do formulário
    echo "entrou no post";
    $filme_id = $_POST["filme_id"];
    $usuario_nome = $_POST["usuario_nome"];
    $comentario = $_POST["comentario"];

    // Aqui você pode realizar a inserção do comentário no banco de dados
    // Por exemplo:
    // Conexão com o banco de dados
    $servername = "localhost"; // Nome do servidor MySQL
    $username = "root"; // Nome de usuário do MySQL
    $password = ""; // Senha do MySQL
    $dbname = "soa"; // Nome do banco de dados
    // Criando conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica se houve erro na conexão
    if ($conn->connect_error) {
        die("Erro na conexão com o banco de dados: " . $conn->connect_error);
    }

    // Prepara a declaração SQL
    $stmt = $conn->prepare("INSERT INTO comentarios (filme_id, usuario_nome, comentario) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $filme_id, $usuario_nome, $comentario);

    // Executa a declaração
    $stmt->execute();

    // Fecha a declaração e a conexão
    $stmt->close();
    $conn->close();

    header("Location: ../detalhes.html?movieId=" . $filme_id);
    exit(); 

    // Exemplo de resposta
    echo "Comentário enviado com sucesso!";
} elseif (isset($_GET["filme_id"])) {
    // Verifica se o parâmetro filme_id foi enviado via GET
    $filme_id = $_GET["filme_id"];

    // Aqui você pode obter os comentários do banco de dados para o filme específico
    // Por exemplo:
    // Conexão com o banco de dados
    $servername = "localhost"; // Nome do servidor MySQL
    $username = "root"; // Nome de usuário do MySQL
    $password = ""; // Senha do MySQL
    $dbname = "soa"; // Nome do banco de dados

    // Criando conexão
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica se houve erro na conexão
    if ($conn->connect_error) {
        die("Erro na conexão com o banco de dados: " . $conn->connect_error);
    }

    // Prepara a declaração SQL
    $stmt = $conn->prepare("SELECT usuario_nome, comentario, data_publicacao FROM comentarios WHERE filme_id = ?");
    $stmt->bind_param("i", $filme_id);

    // Executa a declaração
    $stmt->execute();

    // Obtem o resultado
    $result = $stmt->get_result();

    $resultados = array();

    while ($row = $result->fetch_assoc()) {
        $resultados[] = $row;
    }
    
    // Converter o array em JSON
    echo json_encode($resultados);

    

    // Fecha a declaração e a conexão
    $stmt->close();
    $conn->close();
}
?>
