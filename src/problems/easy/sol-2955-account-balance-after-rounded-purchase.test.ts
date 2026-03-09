/**
2955 - account-balance-after-rounded-purchase - https://leetcode.com/problems/account-balance-after-rounded-purchase/description/

Initially, you have a bank account balance of **100** dollars.

You are given an integer `purchaseAmount` representing t
he amount you will spend on a purchase in dollars, in other words, its price.

When making the purchase, 
first the `purchaseAmount` **is rounded to the nearest multiple of 10**. 
Let us call this value `roundedAmount`. Then, `roundedAmount` 
dollars are removed from your bank account.

Return an integer denoting your final bank account balance after this purchase.

**Notes:**

*   0 is considered to be a multiple of 10 in this problem.
*   When rounding, 5 is rounded upward (5 is rounded to 10, 15 is rounded to 20, 25 to 30, and so on).

**Example 1:**

**Input:** purchaseAmount = 9

**Output:** 90

**Explanation:**

The nearest multiple of 10 to 9 is 10. So your account balance becomes 100 - 10 = 90.

**Example 2:**

**Input:** purchaseAmount = 15

**Output:** 80

**Explanation:**

The nearest multiple of 10 to 15 is 20. So your account balance becomes 100 - 20 = 80.

**Example 3:**

**Input:** purchaseAmount = 10

**Output:** 90

**Explanation:**

10 is a multiple of 10 itself. So your account balance becomes 100 - 10 = 90.

**Constraints:**

*   `0 <= purchaseAmount <= 100`
*/
import { describe, expect, it } from "vitest";

function accountBalanceAfterPurchase(purchaseAmount: number): number {
  const roundedAmount = Math.round(purchaseAmount / 10) * 10;
  return 100 - roundedAmount;
}

describe("2955 - account-balance-after-rounded-purchase", () => {
  it("case-0", () => {
    expect(accountBalanceAfterPurchase(1)).toBe(100);
  });
  it("case-1", () => {
    expect(accountBalanceAfterPurchase(9)).toBe(90);
  });
  it("case-2", () => {
    expect(accountBalanceAfterPurchase(15)).toBe(80);
  });
  it("case-3", () => {
    expect(accountBalanceAfterPurchase(10)).toBe(90);
  });
});
