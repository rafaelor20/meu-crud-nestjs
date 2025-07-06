const { io } = require('socket.io-client');

// Substitua pelo ID do usuário dono do pedido (o mesmo que está no pedido.userId)
const userId = 4;

// Conecta ao servidor passando o userId na query
const socket = io('http://localhost:3000', {
    query: { userId },
    transports: ['websocket'], // força WebSocket puro
});

socket.on('connect', () => {
    console.log(`✅ Conectado ao servidor como usuário ${userId}`);
});

// Escuta o evento enviado pelo backend
socket.on('pagamento.confirmado', (dados) => {
    console.log('💰 Pagamento confirmado!', dados);
});

socket.on('disconnect', () => {
    console.log('❌ Desconectado do servidor');
});

socket.on('connect_error', (err) => {
    console.error('Erro na conexão:', err.message);
});
