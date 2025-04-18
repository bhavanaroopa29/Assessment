exports.exportToCSV = (data) => {
    const headers = Object.keys(data[0]._doc).join(',');
    const rows = data.map((item) => Object.values(item._doc).join(',')).join('\n');
    return `${headers}\n${rows}`;
  };