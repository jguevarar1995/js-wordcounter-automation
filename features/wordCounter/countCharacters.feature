@regression
Feature: Count Characters

  Background: 
    Given Juan opens the WordCounter website

  @character_counter
  Scenario Outline: Counting characters in a simple text
    When he enters the text "<message>"
    Then the character count should be "<expected_chars>"

    Examples: 
      | message               | expected_chars |
      | This is a simple text |             21 |
      | Up the Irons!         |             13 |
      | !#%@=)(%?             |              9 |
      |                       |              0 |

  #@character_counter
  #Scenario: Rendering character counting in a random text
    #When he enters a random text
    #And he adds or remove characters in text
    #Then the character count should be updated successfully