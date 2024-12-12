import View from './view';
import PreviewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Oops! couldn't find recipe for that!`;
  _message = '';

  _generateMarkup(results) {
    return results.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();
