import React, { Component } from 'react'

export default class prueba extends Component {
    carga = (e) => {
        e.preventDefault();
        const data = new FormData();
        const imagedata = this.file
        const name = this.name
        data.append('image', imagedata);
        data.append('name','hola')

        fetch("http://localhost:4000/imagenes", {
          mode: 'no-cors',
      method: "POST",
      body: data
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
      } else if (res.status == 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
    }
    render() {
        return (
            <div>
                <h1>estas en prueba</h1>

                <form encType="multipart/form-data" onSubmit={this.carga}>
                    <input type="file" name="image" onChange={e => this.file = e.target.files[0]}/>
                    <button type="submit">enviar</button>
                </form>
            </div>
        )
    }
}
