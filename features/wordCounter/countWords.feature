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
      | Up the Irons!         |              3 |
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

  @most_repeated_words
  Scenario Outline: Showing the most repeated words
    When he enters the text "<message>"
    Then the word count should be "<expected_words>"

    Examples: 
      | message      | expected_words |
      | uno          |              1 |
      | dos 2        |              2 |
      | tres 3 three |              3 |
