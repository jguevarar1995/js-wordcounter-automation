@regression
Feature: Count Words

  Background: 
    Given Juan opens the WordCounter website

  @word_counter
  Scenario Outline: Counting words in a simple text
    When he enters the text "<message>"
    Then the word count should be "<expected_words>"

    Examples: 
      | message               | expected_words |
      | This is a simple text |              5 |
      | ¡Automation is great! |              3 |
      | 123                   |              1 |
      | !#%@=)(%?             |              0 |
      |                       |              0 |

  @render_counter
  Scenario Outline: Rendering word counting in a random text
    When he enters a random text
    And he "<action>" words in text
    Then the word count should be updated successfully

    Examples: 
      | action |
      | adds   |
      | remove |

  @keyword_density
  Scenario: Validating the most repeated words
    When he enters the text "radiant radiant radiant radiant radiant brightens brightens battle opponents radiant brightens every battle brightens"
    Then the keyword density is calculated successfully