export const sortTable = (items) => {
    const sortedTableItems = items.sort(function (a, b) {
      var itemA = a.itemName.toLowerCase();
      var itemB = b.itemName.toLowerCase();

      if(itemA > itemB) return 1;
      if(itemB > itemA) return -1;
      return 0;
    })

    return sortedItems;
  } 

export const  sortRows = (rows) => {
    const sortField = this.state.sortField;
    if(!sortField) return rows;

    if(sortField.type === "data_1") {
      return rows.sort((a, b) => {  
        const valueA = a[sortField.name] ? a[sortField.name] : -1;
        const valueB = b[sortField.name] ? b[sortField.name] : -1;
        return this.state.ascending ? valueA - valueB : valueB - valueA;
      }) ;
    }
    else if(sortField.type === "data_2") {
      return rows.sort((a,b) => {
        const valueA = a[sortField.name] ? (a[sortField.name] === 5 ? 0 : a[sortField.name]) : -1;
        const valueB = b[sortField.name] ? (b[sortField.name] === 5 ? 0 : b[sortField.name]) : -1;
        return this.state.ascending ? valueA - valueB : valueB - valueA;
      });
    }
    else {
      const sorted = rows.sort((a,b) => {
        const valueA = a[sortField.name] ? a[sortField.name].toLowerCase() : "";
        const valueB = b[sortField.name] ? b[sortField.name].toLowerCase() : "";
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
      });
      return this.state.ascending ? sorted : sorted.reverse();
    }
  }

  // Exmaple how to use sot in columsns
  let columns = [
  {  
    Header: () => (
        <span
          style={
            this.state.sortedFields.personalData
              ? headerStyleSorted
              : headerStyle
          }
        >Tähän otsikko
        </span>
    ),
        sortMethod: (a, b) => {
            let nameA = this.renderName(a).toLowerCase();
            let nameB = this.renderName(b).toLowerCase();
            if (a === b) {
            return 0;
            }
            return nameA > nameB ? 1 : -1;
        },
    
  }
  ]