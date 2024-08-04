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
    case 'gif':
      return {
        // dither: 1,
        // use instead of quality
        // interframe_maxerror: 32.0,
        // interpalette_maxerror: 32.0,
        interframe_maxerror: 8.0,
        reuse: true,
        interlace: true,
      };
    default:
      return {};
  }
};
