# Task

## 1. Exploration task

Go and explore our product at hostinger.com (credentials to login will be provided separately). 

While exploring:

 - 1.1 Identify 3 most critical user flows in product.

 - 1.2 Find at least 2-3 bugs and report them (choose the way of reporting by yourself).


## 2. API testing task

Imagine you have to test the endpoint for changing customer information (name & surname).

Answer the questions:

 - 2.1 What test cases should be executed while testing?

 - 2.2 What kind of risks you would identify for this endpoint (in other words: what could have gone wrong if we left bugs)?

 - 2.3 Without which headers this endpoint will not work properly?


## 3. Test automation task

Write automated test for this flow:

 - 3.1 Visit hostinger.com.

 - 3.2 Initiate the purchase of any plan for 24 months.

 - 3.3 Ensure the proper validations are added.


# Answer

## 1. Exploration task

### 1.1 Identify 3 most critical user flows in product.

 - 1.1.1 hPanel accessibility:

 User Registration: Ensure a seamless and secure process for users to create an account and access the hPanel dashboard.

 User Login: Ensure user is able to login using email or any social provider.

 - 1.1.2 Services management:

 Domain Registration and Transfer: Verify that users can easily register new domains and transfer existing ones.

 Website Creation: Test the process of creating a new website using Hostinger website builder or installing a content management system (CMS).

 File Management: Ensure users can upload, download, and manage their website files through FTP or a file manager.

 Hosting Plans Selection: Confirm that users can choose and purchase hosting plans such as shared hosting or VPS.

 Server Management: Ensure users can manage their VPS or cloud servers efficiently, including scaling, rebooting, and server configuration.

 - 1.1.3 Account settings:

  Account Profile: Verify that users can update their personal information and account preferences.

  Password Management: Test the process of changing and recovering passwords.

  Billing and Payments: Verify users are able to see the billing statements as well as set up payment methods.


### 1.2 Find at least 2-3 bugs and report them (choose the way of reporting by yourself).

 - 1.2.1 Overlapping placeholder and saved account values.
 
 <blockquote>

    Bug Title:
    Account saved values are placed on top of placeholders.

    Date:
    2023-10-11

    Reported By:
    Klaudijus Lupeika

    Product/Service:
    hPanel

    Browser/Environment:
    Google Chrome (117.0.5938.150) / Production

    Bug Description:
    - Summary:
     - After successfully logging in and saving the account credentials to account manager (Chrome), the very next time we try to log in, the values appear on top of placeholders leading to poor UX.

    - Steps to Reproduce:
     - 1. Clear browser cache;
     - 2. Log in to hPanel (https://www.hostinger.com/cpanel-login) and save credentials to Chrome Account manager;
     - 3. Log out;
     - 4. Navigate to https://www.hostinger.com/cpanel-login;
     - 5. Account credentials are already populated in appropriate fields without removing placeholders;

    - Expected Behavior:
     - Account credentials should be populated and placeholders removed;

    - Actual Behavior:
     - Account credentials populated and placeholders remain;

    - Screenshots/Attachments:
     - ![Placeholder issue](https://i.ibb.co/1bV62L7/placeholder.png)

    Impact:
    Minor

    Priority:
    Low

 </blockquote>

 - 1.2.2 After languange change, hover tips showing previous language content.
 
 <blockquote>

    Bug Title:
    After languange change, hover tips showing previous language content.

    Date:
    2023-10-11

    Reported By:
    Klaudijus Lupeika

    Product/Service:
    hPanel

    Browser/Environment:
    Google Chrome (117.0.5938.150) / Production

    Bug Description:
    - Summary:
     - After successfully logging in and changing the language in the top menu bar, the hover tips are either not translated or showing previous language content.

    - Steps to Reproduce:
     - 1. Log in to hPanel (https://www.hostinger.com/cpanel-login);
     - 2. Change language to any other;
     - 3. Hover tips are in previous language or not translated for current one;

    - Expected Behavior:
     - Hover tips should be translated to current selected language;

    - Actual Behavior:
     - Hover tips not translated to currrent language unless page refreshed;

    - Screenshots/Attachments:
     - ![Translations issue](https://s6.gifyu.com/images/S6loN.gif)

    Impact:
    Minor

    Priority:
    Low
    
 </blockquote>

## 2. API testing task

### 2.1 What test cases should be executed while testing?
 - Firstly, we are using PATCH method, because we are only applying partial changes - changing the name/lastname.

 Test cases to consider:
 - Send a PATCH request with valid data to change the customer's name and surname. Verify that the data is updated correctly in the database, and the response code is 200.
 - Send a PATCH request with only the name or only the surname for a customer. Confirm that the respective field is updated, and the other field remains unchanged.
 - Attempt to send a PATCH request with invalid data, such as an empty name or surname. Ensure that the endpoint handles validation and returns an appropriate error response.
 - Verify that only authorized users are allowed to update customer information. Test with both authenticated and unauthenticated requests.

### 2.2 What kind of risks you would identify for this endpoint (in other words: what could have gone wrong if we left bugs)?
 - Bugs in the endpoint could lead to incorrect data updates;
 - Lack of proper authentication and authorization could lead to unauthorized users changing customer data;

### 2.3 Without which headers this endpoint will not work properly?
 - Authorization;
 - Content-Type;
 - Accept;

## 3. Test automation task

To start:

1. npm i
2. npx playwright test
3. npx playwright show-report