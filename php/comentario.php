<?php
// Verifica se os dados do formulário foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["filme_id"], $_POST["usuario_nome"], $_POST["comentario"])) {
    // Recebe os dados do formulário
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

    // Exibe os comentários
    echo "<h3>Comentários do Filme ".$filme_id.":</h3>";
    while ($row = $result->fetch_assoc()) {
        echo "Usuário: " . $row['usuario_nome'] . "<br>";
        echo "Comentário: " . $row['comentario'] . "<br>";
        echo "Data de Publicação: " . $row['data_publicacao'] . "<br>";
        echo "<hr>";
    }

    // Fecha a declaração e a conexão
    $stmt->close();
    $conn->close();
}
?>
