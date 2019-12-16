import React from 'react';
import PropTypes from 'prop-types';


import './Pagination.scss';

class Pagination extends React.Component {

  state = {
    presentPage: this.props.initialPage || 1
  }  

  
  changePage = (newPage) => {
    const { onPageChange } = this.props;
    this.setState({ presentPage: newPage });
    onPageChange(newPage);
  }

	prevPage = () => {
    const { presentPage } = this.state;
    const { changePage } = this;
    if (presentPage > 1 )
    changePage(presentPage - 1)
  };

  nextPage = () => {
  	const { pages } = this.props;
    const { presentPage } = this.state;
    const { changePage } = this;
    if (presentPage < pages )
    changePage(presentPage + 1)
  };
  

  render() {

    const { pages } = this.props;
    const { presentPage } = this.state;
    const { changePage, prevPage, nextPage } = this;
  
    return (
	    <div className="pagination">
	      <ul className="pagination__list">
	      	{ presentPage > 1 ? ( //ES6 version of if
            <li
              className={`pagination__list__item${(true) ? ' pagination__list__item--active' : '' }`}
	            onClick={prevPage}>
	            &lt;
            </li>) : ''}

	        {[...Array(pages)].map((el, page) => (
		        <li
		            key={++page}
		            onClick={() => { changePage(page) }}
		            className={`pagination__list__item${((page) === presentPage) ? ' pagination__list__item--active' : ''}`}>
		            {page}
		        </li>
	        ))}

	        {presentPage === pages ?  '' : (
            <li
              className={`pagination__list__item${(true) ? ' pagination__list__item--active' : '' }`}
              onClick={nextPage}>
              &gt;
          	</li>)}
	      </ul>
	    </div>
	  );
  }
}

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;