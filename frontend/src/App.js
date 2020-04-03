import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import Admin from './components/Dashboard/admin'
import AdminCliente from './components/Dashboard/cliente'
import Users from './components/Dashboard/users'
import Maps from './components/Dashboard/maps'
import Productos from './components/Dashboard/productos'
import Profile from './components/Dashboard/profile'
import Logout from './components/logout'
import Recuperar from './components/CambioContra'
import Cliente from './components/loginCliente'
import Mascotas from './components/Dashboard/mascotas/mascotas'
import Proveedor from './components/Dashboard/Proveedor'
import Pedido from './components/Dashboard/pedido'
import Clientecrud from './components/Dashboard/cliente2'
import cotizaciones from './components/Dashboard/cotizaciones'
import Prueba from './components/Dashboard/pdf'
import Prueba2 from './components/Dashboard/pdf2'
import Prueba3 from './components/Dashboard/pdf3'
import PrivateRoute from './auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cliente" exact component={Cliente} />
        <Route path="/Recuperar" exact component={Recuperar} />
        <PrivateRoute path="/admin" exact component={Admin} />
        <PrivateRoute path="/adminCliente" exact component={AdminCliente} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/productos" exact component={Productos} />
        <PrivateRoute path="/mascotas" exact component={Mascotas} />
        <PrivateRoute path="/proveedor" exact component={Proveedor} />
        <PrivateRoute path="/maps" exact component={Maps} />
        <PrivateRoute path="/Pedido" exact component={Pedido} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/logout" exact component={Logout} />
        <PrivateRoute path="/clientecrud" exact component={Clientecrud} />
        <PrivateRoute path="/cotizaciones" exact component={cotizaciones} />
        <PrivateRoute path="/PdfU" exact component={Prueba} />
        <PrivateRoute path="/PdfP" exact component={Prueba2} />
        <PrivateRoute path="/PdfC" exact component={Prueba3} />
      </Switch>
    </Router>
  );
}

export default App;
