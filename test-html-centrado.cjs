const emailService = require('./services/emailService');
const fs = require('fs');

async function testEmailHTMLCentrado() {
  try {
    console.log('📧 Probando envío real con centrado mejorado...');
    
    // Crear un pedido de prueba simulado
    const pedidoPrueba = {
      _id: { toString: () => '65abc123def456789' },
      usuario: {
        nombre: 'María González',
        email: 'roberprz2@gmail.com' // Usar tu email real
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
        }
      ],
      total: 2120,
      estado: 'confirmado',
      metodo_pago: 'efectivo',
      direccion_entrega: 'Av. Corrientes 1234, CABA',
      fecha_pedido: new Date(),
      notas: 'Entregar en portería'
    };

    console.log('📤 Intentando enviar email...');
    
    // Intentar enviar el email
    const resultado = await emailService.default.enviarEmailConfirmacion(pedidoPrueba);
    
    if (resultado.success) {
      console.log('✅ Email enviado exitosamente!');
      console.log(`� Enviado a: ${pedidoPrueba.usuario.email}`);
      console.log('');
      console.log('🔧 MEJORAS IMPLEMENTADAS EN EL EMAIL:');
      console.log('   ✓ Carrito: Tabla HTML con cellpadding/cellspacing para centrado perfecto');
      console.log('   ✓ Tilde: Estructura de tabla anidada para posicionamiento preciso');
      console.log('   ✓ Compatibilidad máxima con clientes de email móviles');
      console.log('   ✓ Eliminación de flexbox y uso de métodos tradicionales');
      console.log('');
      console.log('📱 PRÓXIMOS PASOS:');
      console.log('   1. Abrir Gmail en móvil y escritorio');
      console.log('   2. Verificar que el carrito esté perfectamente centrado');
      console.log('   3. Verificar que la tilde verde esté perfectamente centrada');
      console.log('   4. Confirmar que todos los íconos están alineados');
    } else {
      console.error('❌ Error al enviar email:', resultado.error);
      
      if (resultado.error.includes('Authentication failed')) {
        console.log('');
        console.log('🔧 SOLUCIÓN PARA ERROR DE AUTENTICACIÓN:');
        console.log('   1. Ir a tu cuenta de Google: myaccount.google.com');
        console.log('   2. Seguridad > Autenticación en 2 pasos');
        console.log('   3. Contraseñas de aplicaciones');
        console.log('   4. Generar nueva contraseña para "Mail"');
        console.log('   5. Reemplazar EMAIL_PASS en .env con la nueva contraseña');
      }
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testEmailHTMLCentrado();
