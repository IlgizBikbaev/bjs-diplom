'use strict'
const logoutButton = new LogoutButton();
logoutButton.action = () => {
     ApiConnector.logout((response) => {
     if(response.success) {
          location.reload();
     }
     });
};

     ApiConnector.current((response) => {
          if (response.success) {
               ProfileWidget.showProfile(response.data);
          }
     });

     const ratesBoard = new RatesBoard();
setInterval(() =>{
ApiConnector.getStocks((response) => {
          if (response.success) {
               ratesBoard.clearTable();
               ratesBoard.fillTable(response.data);
          }
     })
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
     ApiConnector.addMoney(data, (response) => {
          response.message = "Баланс успешно пополнен";
          response.error = "Ошибка! Попробуйте ещё раз";
          if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(response.success, response.message);
          } else {
               moneyManager.setMessage(response.success, response.error);
          }
     });  
}

moneyManager.conversionMoneyCallback = (data) => {
     ApiConnector.convertMoney(data, response => {
          response.message = "Конвертация успешно выполнена";
          response.error = "Ошибка! Попробуйте ещё раз";
          if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(response.success, response.message);
          } else {
               moneyManager.setMessage(response.success, response.error);
          }
     });
}

moneyManager.sendMoneyCallback = (data) => {
     ApiConnector.transferMoney(data, response => {
          response.message = "Перевод успешно выполнен";
          response.error = "Ошибка! Попробуйте ещё раз";
          if (response.success) {
               ProfileWidget.showProfile(response.data);
               moneyManager.setMessage(response.success, response.message);
          } else {
               moneyManager.setMessage(response.success, response.error);
          }
     });
}

const favoritesWidget = new FavoritesWidget();
    ApiConnector.getFavorites((response) => {
      if (response.success) {
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(response.data);
          moneyManager.updateUsersList(response.data);
     }
});


favoritesWidget.addUserCallback = (data) => {
     ApiConnector.addUserToFavorites(data, response => {
          response.message = "Пользователь успешно добавлен";
          response.error = "Ошибка! Попробуйте ещё раз";
          if (response.success) {
               favoritesWidget.clearTable();
               favoritesWidget.fillTable(response.data);
               moneyManager.updateUsersList(response.data);
               favoritesWidget.setMessage(response.success, response.message);
          } else {
               favoritesWidget.setMessage(response.success, response.error);
          }
     });
}


favoritesWidget.removeUserCallback = (data) => {
     ApiConnector.removeUserFromFavorites(data, response => {
          response.message = "Пользователь успешно удалён";
          response.error = "Ошибка! Попробуйте ещё раз";
          if (response.success) {
               favoritesWidget.clearTable();
               favoritesWidget.fillTable(response.data);
               moneyManager.updateUsersList(response.data);
               favoritesWidget.setMessage(response.success, response.message);
          } else {
               favoritesWidget.setMessage(response.success, response.error);
          }
     });
}
