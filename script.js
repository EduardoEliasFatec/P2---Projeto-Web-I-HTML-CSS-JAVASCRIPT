var allowedUsers = [
  { name: 'eduardo', matricula: '1291392522014' }
];

var productsData = [
  { id: 'p1', name: 'Cheeseburger Clássico', price: 25.00, image: 'imagens/p1.jpg' },
  { id: 'p2', name: 'Bacon Burger', price: 30.00, image: 'imagens/p2.jpg' },
  { id: 'p3', name: 'Veggie Burger', price: 28.00, image: 'imagens/p3.jpg' }
];

function appValidateLogin(nameField, passField){
  var name = String(nameField).trim().toLowerCase();
  var pass = String(passField).trim();
  for(var i=0;i<allowedUsers.length;i++){
    if(allowedUsers[i].name.toLowerCase() === name && allowedUsers[i].matricula === pass){
      return true;
    }
  }
  return false;
}

function enviarContato(){
  var n = document.getElementById('c_nome').value;
  var e = document.getElementById('c_email').value;
  var m = document.getElementById('c_msg').value;
  if(n === '' || e === '' || m === ''){
    alert('Preencha todos os campos do contato.');
    return;
  }
  alert('Mensagem enviada. Obrigado, ' + n + '!');
  document.getElementById('c_nome').value = '';
  document.getElementById('c_email').value = '';
  document.getElementById('c_msg').value = '';
}

var cart = [];

function adicionarAoPedido(id){
  for(var i=0;i<productsData.length;i++){
    if(productsData[i].id === id){
      cart.push(productsData[i]);
      break;
    }
  }
  renderCart();
}

function renderCart(){
  var area = document.getElementById('cartArea');
  if(!area) return;
  area.innerHTML = '';
  if(cart.length === 0){
    area.innerHTML = '<p class="empty">Ainda não há produtos.</p>';
    document.getElementById('totalPrice').innerText = 'R$ 0,00';
    return;
  }

  for(var i=0;i<cart.length;i++){
    var item = document.createElement('div');
    item.className = 'cart-item';
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    item.style.padding = '8px 0';

    var left = document.createElement('div');
    left.style.display = 'flex';
    left.style.alignItems = 'center';

    var img = document.createElement('img');
    img.src = cart[i].image;
    img.style.width = '60px';
    img.style.height = '50px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '6px';
    img.style.marginRight = '10px';

    var nome = document.createElement('div');
    nome.innerText = cart[i].name;

    left.appendChild(img);
    left.appendChild(nome);

    var right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';

    var price = document.createElement('div');
    price.innerText = 'R$ ' + cart[i].price.toFixed(2).replace('.',',');
    price.style.marginRight = '12px';

    var btn = document.createElement('button');
    btn.innerText = 'Excluir';
    (function(index){
      btn.onclick = function(){
        cart.splice(index,1);
        renderCart();
      };
    })(i);

    right.appendChild(price);
    right.appendChild(btn);

    item.appendChild(left);
    item.appendChild(right);
    area.appendChild(item);
  }

  var total = 0;
  for(var j=0;j<cart.length;j++){ total += cart[j].price; }
  document.getElementById('totalPrice').innerText = 'R$ ' + total.toFixed(2).replace('.',',');
}

function finalizarPedido(){
  if(cart.length === 0){
    alert('O carrinho está vazio. Adicione itens antes de finalizar.');
    return;
  }
  cart = [];
  renderCart();
  alert('Pedido finalizado com sucesso!');
}
