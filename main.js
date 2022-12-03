// button
const btnOpenContainer = document.getElementById("btnAddItem");
const btnCloceContainer = document.getElementById("btnCloceContainer");
const btnCreateItem = document.getElementById("btnCreateItem");

btnCreateItem.addEventListener("click", createItemSheet);
btnCloceContainer.addEventListener("click", clocePopupContainer);
btnOpenContainer.addEventListener("click", openPopupContainer);

//  input
const popupContainer = document.getElementById("popupContainer");
const inpDocumentNumber = document.getElementById("documentNumber");
const inpQtyElements = document.getElementById("inputQtyElements");
const inputCostElements = document.getElementById("inputCostElements");
const inputTotalElements = document.getElementById("inputTotalElements");
const tableItems = document.getElementById("tableItems");
const inpItemTitle = document.getElementById("inpItemTitle");
const inpDescription = document.getElementById("inpDescription");

inpDocumentNumber.addEventListener("keyup", inpDocumentNumberVerification);
inpQtyElements.addEventListener("keyup", sumOfItemsQtyAndCost);
inputCostElements.addEventListener("keyup", sumOfItemsQtyAndCost);

const invoiceList = [];

function openPopupContainer() {
  return (popupContainer.style.display = "block");
}

function clocePopupContainer() {
  popupContainer.style.display = "none";
}

function inpDocumentNumberVerification(event) {
  const invoiceDocumentNumber = inpDocumentNumber.value;
  const checkingForNumber = invoiceDocumentNumber && !Number.isNaN(invoiceDocumentNumber);
  if (checkingForNumber) {
    return true;
  } else {
    alert("Enter the number");
  }
}

function sumOfItemsQtyAndCost() {
  const qtyElements = inpQtyElements.value;
  const costElements = inputCostElements.value;
  return (inputTotalElements.innerHTML = qtyElements * costElements);
}

function createItemSheet() {
  const newInvoiceList = {
    qtyElem: inpQtyElements.value,
    costElem: inputCostElements.value,
    totalElem: inputTotalElements.innerHTML,
    inpTitle: inpItemTitle.value,
    inpDescrip: inpDescription.value,
  };
  invoiceList.push(newInvoiceList);
  displayMessages();
}

function displayMessages() {
  let displayMessage = "";
  invoiceList.forEach(function (item) {
    displayMessage += `
      <tr
    class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
      >
    <td
    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
    >
    ${item.inpTitle} ${item.inpDescrip}
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    ${item.qtyElem}
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    ${item.costElem}
    </td>
    <td
    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
    >
    $${item.totalElem}
    </td>
    </tr>
      `;
    tableItems.innerHTML = displayMessage;
  });
}
