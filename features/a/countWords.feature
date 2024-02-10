@regression
Feature: Testing WordCounter.net

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
      |                       |              0 |
