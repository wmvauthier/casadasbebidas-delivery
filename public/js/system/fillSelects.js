// var igrejas = httpGet('/igrejas/api').igrejas;
// var onlyIgrejas = httpGet('/igrejas/api/onlyIgrejas').igrejas;
// var onlyMembros = httpGet('/pessoas/api/onlyMembros').pessoas;
// var onlyCongregacoes = httpGet('/igrejas/api/onlyCongregations').igrejas;
// var memberCong = httpGet('/pessoas/api/memberCong').pessoas;
// var onlyPastores = httpGet('/pessoas/api/onlyPastores').pessoas;

// $(document).ready(function () {
//     fillSelectCountry();
//     fillSelectState();
//     fillSelectClassification();
//     fillSelectChurch();
//     fillSelectPastor();
//     fillSelectRegiao();
//     fillSelectSede();
//     fillSelectCargo();
//     fillSelectSituacao();
//     fillSelectTipoRecebimento();
//     fillSelectDepartamento();
//     fillSelectTipoMembro();
//     fillSelectMember();
//     fillSelectMemberCong();
// });

// function fillSelectCountry() {
//     $(".selectCountry").html(`
//         <option disabled selected></option>
//         <option value='BR'>Brasil</option>
//     `);
// };

// function fillSelectState() {
//     $(".selectState").html(`
//         <option disabled selected></option>
//         <option value='AC'>Acre</option>
//         <option value='AC'>Alagoas</option>
//         <option value='AC'>Amapá</option>
//         <option value='AM'>Amazonas</option>
//         <option value='BA'>Bahia</option>
//         <option value='CE'>Ceará</option>
//         <option value='DF'>Distrito Federal</option>
//         <option value='ES'>Espírito Santo</option>
//         <option value='GO'>Goiás</option>
//         <option value='MA'>Maranhão</option>
//         <option value='MT'>Mato Grosso</option>
//         <option value='MS'>Mato Grosso do Sul</option>
//         <option value='MG'>Minas Gerais</option>
//         <option value='PA'>Pará</option>
//         <option value='PB'>Paraíba</option>
//         <option value='PR'>Paraná</option>
//         <option value='PE'>Pernambuco</option>
//         <option value='PI'>Piauí</option>
//         <option value='RJ'>Rio de Janeiro</option>
//         <option value='RN'>Rio Grande do Norte</option>
//         <option value='RS'>Rio Grande do Sul</option>
//         <option value='RO'>Rondônia</option>
//         <option value='RR'>Roraima</option>
//         <option value='SC'>Santa Catarina</option>
//         <option value='SP'>São Paulo</option>
//         <option value='SE'>Sergipe</option>
//         <option value='TO'>Tocantins</option>
//     `);
// };

// function fillSelectClassification() {
//     $(".selectClassification").html(`
//         <option disabled selected></option>
//         <option value="Igreja">Igreja</option>
//         <option value="Congregação">Congregação</option>
//     `);
// };

// function fillSelectChurch() {
//     var fill = '<option disabled selected></option>';
//     igrejas.forEach(element => {
//         fill += `<option value="${element.id_igreja}">${element.nome}</option>`;
//     });
//     $(".selectChurch").html(fill);
// };

// function fillSelectPastor() {
//     var fill = '<option disabled selected></option>';
//     onlyPastores.forEach(element => {
//         fill += `<option value="${element.id_pessoa}">${element.nome}</option>`;
//     });
//     $(".selectPastor").html(fill);
// };

// function fillSelectRegiao() {
//     $(".selectRegiao").html(`
//         <option disabled selected></option>
//         <option value="Região 1">Região 1</option>
//         <option value="Região 2">Região 2</option>
//     `);
// };

// function fillSelectSede() {
//     var fill = '<option disabled selected></option>';
//     onlyIgrejas.forEach(element => {
//         fill += `<option value="${element.id_igreja}">${element.nome}</option>`;
//     });
//     $(".selectSede").html(fill);
// };


// function fillSelectMember() {
//     var fill = '<option disabled selected></option>';
//     onlyMembros.forEach(element => {
//         fill += `<option value="${element.id_pessoa}">${element.nome}</option>`;
//     });
//     $(".selectMember").html(fill);
// };

// function fillSelectMemberCong() {
//     var fill = '<option disabled selected></option>';
//     memberCong.forEach(element => {
//         fill += `<option value="${element.id_pessoa}">${element.nome}</option>`;
//     });
//     $(".selectMember").html(fill);
// };

// function fillSelectCargo() {
//     $(".selectCargo").html(`
//         <option disabled selected></option>
//         <option value="Nenhum">Nenhum</option>
//         <option value="Auxiliar">Auxiliar</option>
//         <option value="Líder de Dept.">Líder de Dept.</option>
//         <option value="Diácono">Diácono</option>
//         <option value="Presbítero">Presbítero</option>
//         <option value="Pastor">Pastor</option>
//     `);
// };

// function fillSelectSituacao() {
//     $(".selectSituacao").html(`
//         <option disabled selected></option>
//         <option value="Ativo">Ativo</option>
//         <option value="Inativo">Inativo</option>
//         <option value="Afastado">Afastado</option>
//         <option value="Disciplinado">Disciplinado</option>
//     `);
// };

// function fillSelectTipoRecebimento() {
//     $(".selectTipoRecebimento").html(`
//         <option disabled selected></option>
//         <option value="Acolhimento">Acolhimento</option>
//         <option value="Batismo">Batismo</option>
//         <option value="Conversão">Conversão</option>
//         <option value="Transferência">Transferência</option>
//     `);
// };

// function fillSelectDepartamento() {
//     $(".selectDepartamento").html(`
//         <option disabled selected></option>
//         <option value="Nenhum">Nenhum</option>
//         <option value="Menibrac">Menibrac</option>
//         <option value="Adobrac">Adobrac</option>
//         <option value="Jubrac">Jubrac</option>
//         <option value="Ufebrac">Ufebrac</option>
//         <option value="Umasbrac">Umasbrac</option>
//         <option value="Grupo de Louvor">Grupo de Louvor</option>
//     `);
// };

// function fillSelectTipoMembro() {
//     $(".selectTipoMembro").html(`
//         <option disabled selected></option>
//         <option value="Membro">Membro</option>
//         <option value="Congregado">Congregado</option>
//         <option value="Obreiro">Obreiro</option>
//         <option value="Pastor">Pastor</option>
//         <option value="Convenção">Convenção</option>
//     `);
// };