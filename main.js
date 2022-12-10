// button
const btnOpenContainer = document.getElementById("btnAddItem");
const btnCloceContainer = document.getElementById("btnCloceContainer");
const btnCreateItem = document.getElementById("btnCreateItem");

btnCreateItem.addEventListener("click", createItemSheet);
btnCloceContainer.addEventListener("click", clocePopupContainer);
btnOpenContainer.addEventListener("click", () => openPopupContainer());

//  input
const popupContainer = document.getElementById("popupContainer");
const inpDocumentNumber = document.getElementById("documentNumber");
const inpQtyElements = document.getElementById("inputQtyElements");
const inputCostElements = document.getElementById("inputCostElements");
const inputTotalElements = document.getElementById("inputTotalElements");
const tableItems = document.getElementById("tableItems");
const inpItemTitle = document.getElementById("inpItemTitle");
const inpDescription = document.getElementById("inpDescription");
const subtotalResult = document.getElementById("subtotalResult");
const discountResult = document.getElementById("discountResult");
const totalResult = document.getElementById("totalResult");
const popupBackgroundBlocker = document.getElementById("popupBackgroundBlocker");

// tableItems.addEventListener("click", updateTableItems);
// popupBackgroundBlocker.addEventListener("click", popupBlocker);
inpDocumentNumber.addEventListener("keyup", inpDocumentNumberVerification);

inpQtyElements.addEventListener("keyup", (event) => { 
  console.log('> inpQtyElements:', event.currentTarget.value);
  currentWorkItem.qty = parseInt(event.currentTarget.value);
  inputTotalElements.innerHTML = currentWorkItem.total;
  checkCanCreate();
});
inpItemTitle.addEventListener("keyup", (event) => { 
  console.log('> inpItemTitle:', event.currentTarget.value);
  currentWorkItem.title = event.currentTarget.value;
  checkCanCreate();
});
inputCostElements.addEventListener("keyup", (event) => { 
  console.log('> inputCostElements:', event.currentTarget.value);
  currentWorkItem.cost = parseInt(event.currentTarget.value);
  inputTotalElements.innerHTML = currentWorkItem.total;
  checkCanCreate();
});

const checkCanCreate = () => {
  const result = !(currentWorkItem.title.length > 0 && currentWorkItem.total > 0);
  console.log('> checkCanCreate:', result);
  btnCreateItem.disabled = result;
}

class InvoiceVO {
  constructor() {
    this.id = '';
    this.items = [];
    this.discount = 0;
    this.iban = '';
  }
}

class WorkItemVO {
  constructor(title = '', description = '', qty, cost) {
    this.title = title;
    this.description = description;
    this.qty = qty;
    this.cost = cost;
  }
  get total() { return (this.cost || 0) * (this.qty || 0); }
}

const invoiceVO = JSON.parse(localStorage.getItem('invoice')) || new InvoiceVO();
let currentWorkItem = null;

displayMessages();

function openPopupContainer(index) {
  currentWorkItem = index ? invoiceVO.items[index] : new WorkItemVO();
  btnCreateItem.disabled = true;
  popupContainer.style.display = "block";
}

// function popupBlocker() {}

function clocePopupContainer() {
  popupContainer.style.display = "none";
}

function inpDocumentNumberVerification() {
  const invoiceDocumentNumber = inpDocumentNumber.value;
  const checkingForNumber = invoiceDocumentNumber && !Number.isNaN(invoiceDocumentNumber);
  if (checkingForNumber) {
    return true;
  } else {
    alert("Enter the number");
  }
}

function sumOfItemsQtyAndCost() {
  const canCalculateTotal = currentWorkItem.qty && currentWorkItem.cost;
  currentWorkItem.total = canCalculateTotal ? (currentWorkItem.qty * currentWorkItem.cost) : 0;
  inputTotalElements.innerHTML = currentWorkItem.total;
}

function createItemSheet() {
  invoiceVO.items.push(currentWorkItem);
  currentWorkItem = null;
  displayMessages();
  saveInvoice();
}

function saveInvoice() {
  localStorage.setItem('invoice', JSON.stringify(invoiceVO));
}

function displayMessages() {
  let displayMessage = "";
  invoiceVO.items.forEach((workItemVO, index) => {
    displayMessage += `
      <tr
    class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
    for="item_${index}"
      >
    <td
    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
    >
    ${workItemVO.title} <span class="text-gray-500"><br>${workItemVO.description}</span>
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    ${workItemVO.qty}
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    ${workItemVO.cost}
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    $${workItemVO.total}
    </td>
    </tr>
      `;


    // subtotalResult.innerHTML = invoiceVO.items.reduce(function (prev, curr) {
    //   return prev + curr.total;
    // }, 0);
  });
  tableItems.innerHTML = displayMessage;
}

// function updateTableItems(event) {
//   console.log(event.);
// }

function validationOnCreate() {
  const qtyElem = inpQtyElements.value;
  const costElem = inputCostElements.value;
  // const totalElem = inputTotalElements.innerHTML;
  const inpTitle = inpItemTitle.value;
  const inpDescrip = inpDescription.value;
  btnCreateItem.setAttribute("disabled", true);
  if (qtyElem.length != 0 && costElem.length != 0 && inpTitle.length != 0 && inpDescrip.length != 0) {
    return (btnCreateItem.disabled = false);
  } else {
    return (btnCreateItem.disabled = true);
  }
}
