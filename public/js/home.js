var churchTableBody = $("#churchTableBody")[0];

$(document).ready(function () {

    checkToken();

    var result = httpGet('/igrejas/api');
    activateButtonsCarousel(result.igrejas.length);

    result.igrejas.forEach(igreja => {
        createChurch(igreja);
    });

    DAOgetAllChurchs();
    
});

function DAOgetAllChurchs() {
    var response = httpGet('/igrejas/api');
    fillChurchTable(churchTableBody, response.igrejas);
}

function createChurch(igreja) {

    $("#resumeMultiCarousel-inner").append($(`

    <div class="item">
    <div class="pad15">
        <p class="lead"><b>${igreja.nome}</b></p>
        <p class="lead">pastor</p>
        <div class="row">

            <div class="col">

                <h2 class="h6 font-weight-bold text-center mb-4">Categoria</h2>
                <!-- Progress bar 1 -->
                <div class="progress mx-auto" data-value='60'>
                    <span class="progress-left">
                        <span class="progress-bar border-primary"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar border-primary"></span>
                    </span>
                    <div
                        class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                        <div class="h5 font-weight-bold">CAT.<sup class="small">A</sup>
                        </div>
                    </div>
                </div>
                <!-- END -->

            </div>

            <div class="col">
                <h2 class="h6 font-weight-bold text-center mb-4">Finanças</h2>

                <!-- Progress bar 2 -->
                <div class="progress mx-auto" data-value='25'>
                    <span class="progress-left">
                        <span class="progress-bar border-danger"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar border-danger"></span>
                    </span>
                    <div
                        class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                        <div class="h5 font-weight-bold"><sup class="small">R$</sup>200,10
                        </div>
                    </div>
                </div>
                <!-- END -->

            </div>

        </div>
        <div class="row">

            <div class="col">
                <h2 class="h6 font-weight-bold text-center mb-4">Server time</h2>

                <!-- Progress bar 3 -->
                <div class="progress mx-auto" data-value='76'>
                    <span class="progress-left">
                        <span class="progress-bar border-success"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar border-success"></span>
                    </span>
                    <div
                        class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                        <div class="h5 font-weight-bold">76<sup class="small">%</sup>
                        </div>
                    </div>
                </div>
                <!-- END -->
            </div>

            <div class="col">
                <h2 class="h6 font-weight-bold text-center mb-4">Total overdue</h2>

                <!-- Progress bar 4 -->
                <div class="progress mx-auto" data-value='12'>
                    <span class="progress-left">
                        <span class="progress-bar border-warning"></span>
                    </span>
                    <span class="progress-right">
                        <span class="progress-bar border-warning"></span>
                    </span>
                    <div
                        class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                        <div class="h5 font-weight-bold">12<sup class="small">%</sup>
                        </div>
                    </div>
                </div>
                <!-- END -->
            </div>

        </div>

    </div>
</div>

`));

}

function activateButtonsCarousel(qtd) {

    var bodyWidth = $('body').width();
    var dataCarousel = $('.MultiCarousel')[0];
    var data = dataCarousel.getAttribute('data-items');

    if ((bodyWidth >= 1200 && qtd < data[6]) ||
        (bodyWidth >= 992 && qtd < data[4]) ||
        (bodyWidth >= 768 && qtd < data[2]) ||
        (qtd < data[0])) {
        $('.leftLst').addClass('hidden');
        $('.rightLst').addClass('hidden');
    } else {
        $('.leftLst').removeClass('hidden');
        $('.rightLst').removeClass('hidden');
    }

}

function fillChurchTable(table, data) {

    table.innerHTML = "";

    data.forEach(function (church) {
        createChurchToChurchTable(table, church);
    });

}

//Insere Usuário na Lista de Usuários
function createChurchToChurchTable(table, church) {

    var pt = '';

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.innerHTML = church.id_igreja;
    td2.innerHTML = church.nome;
    td3.innerHTML = church.regiao;
    td4.innerHTML = pt;
    td5.innerHTML = church.classificacao;
    td6.innerHTML = `<button class="btn btn-rounded btn-warning" dataID="${church.id_igreja}" 
                        data-toggle="modal" data-target="#updateChurchModal"
                        data-backdrop="static" onclick="preUpdateChurch(this)">
                        Editar</button>
                     <button class="btn btn-rounded btn-danger" dataID="${church.id_igreja}"
                        data-toggle="modal" data-target="#deleteChurchModal"
                        data-backdrop="static" onclick="preDeleteChurch(this)">
                        Excluir</button>`;

    td1.setAttribute("data-title", "ID");
    td2.setAttribute("data-title", "Nome");
    td3.setAttribute("data-title", "Área");
    td4.setAttribute("data-title", "Pastor");
    td5.setAttribute("data-title", "Classificação");
    td6.setAttribute("data-title", "Ações");

    td6.style = "text-align: center;"

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    table.appendChild(tr);

}
