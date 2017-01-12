import * as React from 'react';
import * as $ from 'jquery';
import * as moment from 'moment';

class AddOzp extends React.Component<any, any> {
  csrf: any;

  componentDidMount() {
    this.csrf.value = $('meta[name="_csrf"]').attr('content');
  }

  render() {
    return (
      <div id="modalOzp" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" className="modal fade">
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" data-dismiss="modal" aria-label="Close" className="close"> <span aria-hidden="true">&times; </span></button>
              <h4 id="myModalLabel" className="modal-title">Добавить запись </h4>
            </div>
            <div className="modal-body">
              <form action="/dashboard/ozp/store" name="ozp" id="form-ozp" method="POST" style={{ margin: 0 }}>
                <input type="hidden" name="_csrf" ref={(input) => { this.csrf = input; }}/>
                <div className="form-group">
                  <label htmlFor="ozp-date">Дата: </label>
                  <input type="text" name="date" id="ozp-date" className="form-control makdoors-datepicker" value={ moment().locale('ru').format('L') } />
                </div>
                <div className="form-group">
                  <label htmlFor="ozp-amount">Сумма (р.): </label>
                  <input type="text" name="amount" id="ozp-amount" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="ozp-payment">Предоплата (р.): </label>
                  <input type="text" name="payment" id="ozp-payment" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="ozp-address">Адрес доставки или номер и дата заказа на самовывоз: </label>
                  <textarea name="address" id="ozp-address" className="form-control"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" data-dismiss="modal" className="btn btn-default">Закрыть </button>
              <button form="ozp" className="btn btn-primary btn-ozp-send">Добавить в отчет </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddOzp;
