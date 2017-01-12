import * as React from 'react';
import * as $ from 'jquery';
import * as moment from 'moment';

class AddShift extends React.Component<any, any> {
  csrf: any;

  constructor() {
    super();
  }

  componentDidMount() {
    this.csrf.value = $('meta[name="_csrf"]').attr('content');
  }

  render() {
    return (
      <div id="modalOzpShift" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" className="modal fade">
        <div role="document" className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" data-dismiss="modal" aria-label="Close" className="close"><span aria-hidden="true">&times;</span></button>
              <h4 id="myModalLabel" className="modal-title">Добавить запись</h4>
            </div>
            <div className="modal-body">
              <form action="/dashboard/ozp/setShift" name="ozp" id="form-ozpShift" method="POST" style={{ margin: 0 }}>
                <input type="hidden" name="_csrf" ref={(input) => { this.csrf = input; }} />
                <div className="form-group">
                  <label htmlFor="ozpShift-date">Дата:</label>
                  <input type="text" name="date" className="form-control makdoors-datepicker" value={ moment().locale('ru').format('L') } />
                </div>
                <div className="form-group">
                  <label htmlFor="ozpShift-amount">Аванс (р.):</label>
                  <input type="text" name="amount" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="ozpShift-payment">Кол - во смен:</label>
                  <input type="text" name="count" className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" data-dismiss="modal" className="btn btn-default">Закрыть</button>
              <button form="ozp" className="btn btn-primary btn-ozpShift-send">Добавить в отчет</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddShift;
