class CharDensityTable {
  constructor(parentEl) {
    this._parentEl = parentEl;
  }

  render(data) {
    this._data = data;
    let html = '<h2 class="density__heading">Letter Density</h2>';

    if (!this._data || !Object.keys(this._data).length) {
      html += this._generateEmptyTableMarkup();
    } else {
      html += this._generateTableMarkup();
    }
    this._parentEl.innerHTML = html;
  }

  _generateTableMarkup() {
    const total = Object.values(this._data).reduce((acc, el) => acc + el, 0);
    return `<table class="density__table">
            ${Object.entries(this._data)
              .sort((a, b) => b[1] - a[1])
              .map((char) => this._generateRowMarkup(char, total))
              .join("")}
            </table>
            <label for="see-more-check" class="density__see-more-btn">See more</label>`;
  }

  _generateEmptyTableMarkup() {
    return `
        <span class="density__message">
          No characters found. Start typing to see letter density.
        </span>`;
  }

  _generateRowMarkup([key, value], total) {
    const percent = ((value * 100) / total).toFixed(2);
    return `
        <tr class="density__row">
            <td class="density__char">${key}</td>
            <td class="density__bar">
                <div class="density__bar-outer">
                <div class="density__bar-inner" style="width: ${percent}%"></div>
                </div>
            </td>
            <td class="density__text">${value} (${percent}%)</td>
        </tr>`;
  }
}

export { CharDensityTable };
