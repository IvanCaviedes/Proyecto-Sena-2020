import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import moment from 'moment'
export default class prueba extends Component {
  constructor(props) {
    super(props);
    this.state={
      Tusuarios:[]
    }
  }
  componentDidMount(){
    this.listar2();
  }
  listar2 = (e) => {
    const token12 = localStorage.getItem('token')
    const envio = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Origin': 'https://veterinariapetshop.herokuapp.com/',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token12}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
            'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
        }),
    };
    fetch('https://veterinariapetshop.herokuapp.com/cotizacion/todos', envio)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            this.setState({ Tusuarios: '' })
            throw new Error('Usuario no creado')
        })
        .then(token => {
            if (token.message) {

            }
            else {
                this.setState({ Tusuarios: token.Proveedores })
            }
            return;
        })
        .catch(e => {
            this.setState({ mensaje: e.message })
        })
}
  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 10, -90);
        pdf.save("Cotizaciones.pdf");
      })
    ;
  }
  render() {
    return (
      <div>
      <div id="divToPrint" className="mt4" style={{background:'#fff',width: '210mm',minHeight: '297mm',marginLeft: 'auto',marginRight: 'auto'}}>
        <h1 className="text-center mt-2">Reporte de cotizaciones</h1>
<br/>
<br/>
<br/>
<h3 className="text-center">Ultimas Cotizaciones registradas</h3>

<br/>
<br/>
<br/>
        <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Idcliente</th>
                                                <th scope="col">fecha</th>
                                                <th scope="col">precio total</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Cantidad de productos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.Idcliente}</td>
                                                            <td>{moment(user.date).format('MMMM Do YYYY')}</td>
                                                            <td>{user.Tventa}</td>
                                                            <td>{user.estado}</td>
                                                            <td>{JSON.parse(user.productos).length}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
      </div>
      <div className="mb5">
        <button className="btn btn-primary btn-block" onClick={this.printDocument}>Print</button>
      </div>
      </div>
        )
  }
}
