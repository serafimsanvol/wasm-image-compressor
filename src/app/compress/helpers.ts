export const getParamsByExtension = (extension: string) => {
  switch (extension) {
    case 'png':
      return {
        palette: true,
      };
    case 'jpeg':
    case 'jpg':
      return {
        optimize_coding: true,
        interlace: true,
        optimize_scans: true,
        trellis_quant: true,
        quant_table: 3,
      };
    default:
      return {};
  }
};
