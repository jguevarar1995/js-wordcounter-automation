@regression
Feature: Count Characters

  Background: 
    Given Juan opens the WordCounter website

  @character_counter
  Scenario Outline: Counting characters in a simple text
    When he enters the text "<message>"
    Then the character count should be "<expected_chars>"

    Examples: 
      | message                                | expected_chars |
      | Another text to count their characters |             38 |
      | Javascript is better than Java?!       |             32 |
      | !#%@=) (%?                             |             10 |
      |                                  12345 |              5 |
      |                                        |              0 |
