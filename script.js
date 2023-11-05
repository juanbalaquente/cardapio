const BD = {
    segunda: [],terca: [],quarta: [],quinta: [],sexta: [],sabado: [],domingo: []
};

document.addEventListener("DOMContentLoaded", function () {
    const comida = document.querySelector('#comida');
    const dia = document.querySelector('#dia');
    const btnExcluir = document.getElementById('btnExcluir');
    const btnEditar = document.getElementById('btnEditar');

    comida.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            enviar(comida, dia);
        }
    });

    btnExcluir.addEventListener('click', function () {
        excluirItens();
    });

    btnEditar.addEventListener('click', function () {
        editarItens(comida, dia);
    });
});

function enviar(comida, dia) {
    const produto = {
        comida: comida.value,
        dia: dia.value,
        id: Date.now() 
    };

    BD[dia.value].push(produto);

    let tabelaDia = document.getElementById(dia.value);
    tabelaDia.innerHTML += `<tr><td><input type="checkbox" id="${produto.id}" onchange="verificar(this.id)"></td><td>${produto.comida}</td><td></td></tr><br>`;

    console.log('A tecla "Enter" foi pressionada.');
    console.log('Comida:', comida.value);
    console.log('Dia:', dia.value);

    console.log(BD);
}

function excluirItens() {
    for (const diaSemana in BD) {
        if (BD.hasOwnProperty(diaSemana)) {
            const diaArray = BD[diaSemana];
            for (let i = diaArray.length - 1; i >= 0; i--) {
                const elemento = document.getElementById(diaArray[i].id);
                if (elemento.checked) {
                    diaArray.splice(i, 1); 
                }
            }
        }
    }
    montarTabela(); 
}

function editarItens(comida, dia) {
    for (const diaSemana in BD) {
        if (BD.hasOwnProperty(diaSemana)) {
            const diaArray = BD[diaSemana];
            for (let i = 0; i < diaArray.length; i++) {
                const elemento = document.getElementById(diaArray[i].id);
                if (elemento.checked) {
                    diaArray[i].comida = comida.value;
                    diaArray[i].dia = dia.value;
                    elemento.checked = false; 
                }
            }
        }
    }
    montarTabela(); 
}

function montarTabela() {
    for (const diaSemana in BD) {
        if (BD.hasOwnProperty(diaSemana)) {
            const diaArray = BD[diaSemana];
            const tabelaDia = document.getElementById(diaSemana);
            tabelaDia.innerHTML = '';

            diaArray.forEach((produto) => {
                tabelaDia.innerHTML += `<tr><td><input type="checkbox" id="${produto.id}" onchange="verificar(this.id)"></td><td>${produto.comida}</td><td></td></tr><br>`;
            });
        }
    }
}

function verificar(id) {
    console.log('Checkbox com ID', id, 'foi alterado');
}