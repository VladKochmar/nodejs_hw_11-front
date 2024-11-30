class ListDataManager {
  static createTableHeader(fields, createLinkFunction, deleteFunction) {
    const thead = document.createElement('thead')
    const theadRow = document.createElement('tr')

    for (const key in fields) {
      const th = document.createElement('th')
      th.textContent = fields[key]
      theadRow.appendChild(th)
    }

    if (createLinkFunction) {
      const editTh = document.createElement('th')
      editTh.textContent = 'Редагувати'
      theadRow.appendChild(editTh)
    }

    if (deleteFunction) {
      const deleteTh = document.createElement('th')
      deleteTh.textContent = 'Видалити'
      theadRow.appendChild(deleteTh)
    }

    thead.appendChild(theadRow)
    return thead
  }

  static createTableRow(item, fields, createLinkFunction, deleteFunction) {
    const row = document.createElement('tr')

    for (const key in fields) {
      const td = document.createElement('td')

      if (key === 'img' || key === 'image') {
        const img = document.createElement('img')
        img.src = item[key]
        img.alt = fields[key]
        img.style.width = '100px'
        td.appendChild(img)
      } else {
        td.textContent = item[key]
      }

      row.appendChild(td)
    }

    if (createLinkFunction) {
      const editTd = document.createElement('td')
      const editLink = document.createElement('a')

      editLink.href = createLinkFunction(item._id)
      editLink.onclick = () => localStorage.setItem('itemId', item._id)
      editLink.textContent = 'Редагувати'

      editTd.appendChild(editLink)
      row.appendChild(editTd)
    }

    if (deleteFunction) {
      const deleteTd = document.createElement('td')
      const deleteButton = document.createElement('button')

      deleteButton.textContent = 'Видалити'
      deleteButton.onclick = () => deleteFunction(item._id)

      deleteTd.appendChild(deleteButton)
      row.appendChild(deleteTd)
    }

    return row
  }

  static createTableFromList(data, fields, createLinkFunction, deleteFunction) {
    const table = document.createElement('table')
    table.border = '1'

    const thead = ListDataManager.createTableHeader(fields, createLinkFunction, deleteFunction)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')

    data.forEach(item => {
      const row = ListDataManager.createTableRow(item, fields, createLinkFunction, deleteFunction)
      tbody.appendChild(row)
    })

    table.appendChild(tbody)

    return table
  }
}
