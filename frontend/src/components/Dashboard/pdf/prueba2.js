import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default class prueba extends Component {
  constructor(props) {
    super(props);
    this.state={
      Tusuarios:[]
    }
  }
  componentDidMount(){
    this.listar();
  }
  listar = (e) => {
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
    fetch('https://veterinariapetshop.herokuapp.com/product/', envio)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            this.setState({ Tusuarios: '' })
            throw new Error('Usuario no creado')
        })
        .then(token => {
            this.setState({ Tusuarios: token.products })
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
        pdf.addImage(imgData, 'JPEG', 10, -280);
        pdf.save("Productos.pdf");
      })
    ;
  }
  render() {
    return (
      <div>
      <div id="divToPrint" className="mt4" style={{background:'#fff',width: '210mm',minHeight: '297mm',marginLeft: 'auto',marginRight: 'auto'}}>
        <h1 className="text-center mt-2">Reporte Productos</h1>
<br/>
<br/>
<br/>
<h3 className="text-center">Ultimos productos registrados</h3>

<br/>
<br/>
<br/>
        <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">NOMRBE</th>
                                                <th scope="col">PRECIO</th>
                                                <th scope="col">CATEGORIA</th>
                                                <th scope="col">STOCK</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.price}</td>
                                                            <td>{user.categoty}</td>
                                                            <td>{user.stock}</td>
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
