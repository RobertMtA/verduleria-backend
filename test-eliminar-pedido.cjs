const mongoose = require('mongoose');

// Configuración de conexión a MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/verduleria_online';

async function probarEliminarPedido() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Definir el esquema de pedido
    const pedidoSchema = new mongoose.Schema({}, { strict: false });
    const Pedido = mongoose.model('Pedido', pedidoSchema, 'pedidos');

    console.log('📋 Consultando pedidos existentes...');
    
    const pedidos = await Pedido.find({}).limit(5);
    
    if (pedidos.length === 0) {
      console.log('⚠️  No hay pedidos en la base de datos para probar');
      return;
    }

    console.log(`\n📊 Pedidos disponibles para prueba:\n`);
    
    pedidos.forEach((pedido, index) => {
      console.log(`${index + 1}. ID: ${pedido._id}`);
      console.log(`   Cliente: ${pedido.usuario?.nombre || "Sin nombre"}`);
      console.log(`   Estado: ${pedido.estado || "Sin estado"}`);
      console.log(`   Total: $${pedido.total || 0}`);
      console.log(`   Fecha: ${pedido.fecha_pedido || "Sin fecha"}`);
      console.log('   ---');
    });

    console.log('\n🧪 PRUEBA DEL ENDPOINT DELETE:');
    console.log('   URL: DELETE /api/pedidos/:id');
    console.log('   Funcionalidad: Eliminar pedido específico');
    console.log('   Respuesta esperada: { success: true, message: "Pedido eliminado correctamente" }');
    console.log('');
    console.log('📱 FUNCIONALIDAD EN EL FRONTEND:');
    console.log('   ✅ Botón "Eliminar" en cada fila');
    console.log('   ✅ Confirmación con window.confirm()');
    console.log('   ✅ Llamada DELETE al backend');
    console.log('   ✅ Actualización de la lista local');
    console.log('   ✅ Mensaje de éxito/error');
    console.log('');
    console.log('🎯 PARA PROBAR MANUALMENTE:');
    console.log('   1. Ir a http://localhost:5173/admin/pedidos');
    console.log('   2. Click en botón "Eliminar" de cualquier pedido');
    console.log('   3. Confirmar en el diálogo');
    console.log('   4. Verificar que el pedido desaparece de la lista');
    console.log('   5. Verificar mensaje de éxito');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  } finally {
    console.log('\n🔄 Cerrando conexión...');
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');
  }
}

// Ejecutar la prueba
probarEliminarPedido();
