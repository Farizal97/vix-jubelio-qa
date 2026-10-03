# UI Test Cases (Sauce Demo Alternative)

## 1. Positive Login Flow
**Test Case ID:** TC_UI_LOGIN_001
**Priority:** High

```gherkin
Feature: User Login Sauce Demo
  Scenario: Successful login with valid credentials
    Given The user opens the Sauce Demo login page
    When The user enters username "standard_user" and password "secret_sauce"
    And The user clicks the login button
    Then The user should be redirected to the inventory products page
```

## 2. Negative Login Flow
**Test Case ID:** TC_UI_LOGIN_002
**Priority:** High

```gherkin
Feature: User Login Sauce Demo - Negative
  Scenario Outline: Failed login due to invalid credentials
    Given The user opens the Sauce Demo login page
    When The user enters "<username>" and "<password>"
    And The user clicks the login button
    Then The user should see an error message "<error_message>"

    Examples:

      | username        | password     | error_message                                              |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.       |
      | wrong_user      | secret_sauce | Epic sadface: Username and password do not match any user |
```

## 3. Inventory Flow (Add & Remove Product)
**Test Case ID:** TC_UI_INVENTORY_001
**Priority:** Medium

```gherkin
Feature: Inventory Management
  Scenario: Successfully modify product state in catalog
    Given The user is logged in and on the inventory page
    When The user clicks "Add to cart" on the first product
    Then The button text should change to "Remove"
    And The shopping cart badge counter should display "1"
```
