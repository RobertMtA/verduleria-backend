const emailService = require('./services/emailService');

async function testEmailCentradoFinal() {
  try {
    console.log('� Enviando email de prueba con centrado final mejorado...');
    
    // Crear un pedido de prueba simulado
    const pedidoPrueba = {
      _id: { toString: () => '65abc123def456789' },
      usuario: {
        nombre: 'María González',
        email: 'roberprz2@gmail.com' // Usar tu email para la prueba
      },
      productos: [
        {
          nombre: 'Tomates Cherry Orgánicos',
          cantidad: 2,
          precio: 850,
          subtotal: 1700
        },
        {
          nombre: 'Lechuga Criolla Premium',
          cantidad: 1,
          precio: 420,
          subtotal: 420
        },
        {
          nombre: 'Naranjas Valencia',
          cantidad: 3,
          precio: 150,
          subtotal: 450
        }
      ],
      total: 2570,
      estado: 'confirmado',
      metodo_pago: 'efectivo',
      direccion_entrega: 'Av. Corrientes 1234, CABA',
      fecha_pedido: new Date(),
      notas: 'Entregar en portería. Timbre: Apt 4B'
    };

    const resultado = await emailService.enviarEmailConfirmacion(pedidoPrueba);
    
    if (resultado.success) {
      console.log('✅ Email enviado exitosamente!');
      console.log(`📮 Enviado a: ${pedidoPrueba.usuario.email}`);
      console.log('🎯 El email incluye:');
      console.log('   - Carrito centrado con tabla HTML para máxima compatibilidad');
      console.log('   - Tilde de confirmación centrado usando estructura de tabla');
      console.log('   - Diseño responsive para móviles y escritorio');
      console.log('   - Íconos de información alineados correctamente');
      console.log('');
      console.log('📱 VERIFICACIÓN REQUERIDA:');
      console.log('   1. Abrir email en Gmail (móvil y web)');
      console.log('   2. Verificar que el carrito esté perfectamente centrado');
      console.log('   3. Verificar que la tilde verde esté perfectamente centrada');
      console.log('   4. Verificar que los íconos de información estén alineados');
      console.log('   5. Verificar responsividad en diferentes tamaños de pantalla');
      console.log('');
      console.log('🔧 MEJORAS IMPLEMENTADAS:');
      console.log('   - Uso de tablas HTML para centrado en lugar de flexbox');
      console.log('   - Estructura de tabla anidada para íconos circulares');
      console.log('   - Compatibilidad máxima con clientes de email móviles');
      console.log('   - Posicionamiento preciso con cellpadding/cellspacing');
    } else {
      console.error('❌ Error al enviar email:', resultado.error);
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testEmailCentradoFinal();
