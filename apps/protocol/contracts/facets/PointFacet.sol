// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract PointFacet {
  receive() external payable {}

  fallback() external payable {}

  function accountPoint() external pure returns (uint256) {
    return 100;
  }
}
