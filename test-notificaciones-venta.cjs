// Script para probar el sistema de notificaciones de ventas
const https = require('https');
const http = require('http');

const API_URL = 'http://localhost:4001/api';

// Función para hacer peticiones HTTP
const makeRequest = (url, options) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
};

const probarNotificacionVenta = async () => {
  try {
    console.log('🧪 Probando sistema de notificaciones de ventas...\n');

    // Datos de prueba para un pedido
    const pedidoPrueba = {
      usuario: {
        nombre: 'Roberto Gaona (Prueba)',
        email: 'cliente.prueba@email.com',
        telefono: '+54 9 11 1234-5678',
        direccion: 'Av. Ejemplo 123, Ciudad Autónoma de Buenos Aires'
      },
      productos: [
        {
          nombre: 'Manzana Roja',
          precio: 850,
          cantidad: 2,
          subtotal: 1700
        },
        {
          nombre: 'Lechuga Orgánica',
          precio: 1200,
          cantidad: 1,
          subtotal: 1200
        },
        {
          nombre: 'Tomate Cherry',
          precio: 980,
          cantidad: 3,
          subtotal: 2940
        }
      ],
      total: 5840,
      metodo_pago: 'mercadopago'
    };

    console.log('📝 Creando pedido de prueba...');
    console.log('Cliente:', pedidoPrueba.usuario.nombre);
    console.log('Email:', pedidoPrueba.usuario.email);
    console.log('Total:', `$${pedidoPrueba.total.toLocaleString('es-AR')}`);
    console.log('Productos:', pedidoPrueba.productos.length);
    console.log('');

    // Crear el pedido (esto debería disparar las notificaciones)
    const resultado = await makeRequest(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedidoPrueba)
    });

    if (resultado.success) {
      console.log('✅ Pedido creado exitosamente!');
      console.log('📧 ID del pedido:', resultado.pedido._id);
      console.log('📧 Número corto:', resultado.pedido._id.slice(-8).toUpperCase());
      console.log('');
      console.log('📧 Verificando notificaciones enviadas:');
      console.log('   → Email de confirmación al cliente');
      console.log('   → Email de notificación al admin');
      console.log('');
      console.log('🎯 Revisa tu bandeja de entrada para verificar los emails enviados');
      console.log('');
      
      // Mostrar información del pedido creado
      console.log('📋 Resumen del pedido:');
      console.log('   Estado:', resultado.pedido.estado);
      console.log('   Fecha:', new Date(resultado.pedido.fecha_pedido).toLocaleString('es-ES'));
      console.log('   Método de pago:', resultado.pedido.metodo_pago);
      
    } else {
      console.error('❌ Error al crear pedido:', resultado.error);
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
};

// Función para mostrar instrucciones
const mostrarInstrucciones = () => {
  console.log('📋 INSTRUCCIONES PARA LA PRUEBA:');
  console.log('');
  console.log('1. Asegúrate de que el backend esté corriendo en el puerto 4001');
  console.log('2. Configura las variables de entorno en .env:');
  console.log('   - EMAIL_USER: tu email de Gmail');
  console.log('   - EMAIL_PASS: tu App Password de Gmail');
  console.log('   - ADMIN_EMAIL: email donde quieres recibir notificaciones');
  console.log('');
  console.log('3. Este script creará un pedido de prueba y enviará:');
  console.log('   📧 Email de confirmación → cliente.prueba@email.com');
  console.log('   🚨 Email de notificación → ADMIN_EMAIL (configurado en .env)');
  console.log('');
  console.log('4. Revisa ambas bandejas de entrada para verificar los emails');
  console.log('');
  console.log('🚀 Iniciando prueba en 3 segundos...');
  console.log('');
};

// Ejecutar la prueba
mostrarInstrucciones();
setTimeout(probarNotificacionVenta, 3000);
