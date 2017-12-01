import constants from 'core/types';

/**
 * specifyProvider - Specify the Web3 PRovider
 */
export function specifyProvider(provider) {
  return {
    provider: provider,
    type    : constants.SPECIFY_PROVIDER
  };
}

export function specifyOracle(oracle) {
  return {
    oracle: oracle,
    type  : constants.SPECIFY_ORACLE
  }
}

export function specifyCVNBI(nbi) {
  return {
    nbi : nbi,
    type: constants.SPECIFY_CV_NBI
  }
}