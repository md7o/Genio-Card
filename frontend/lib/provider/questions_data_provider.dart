import 'package:flutter_riverpod/flutter_riverpod.dart';

final questionsProvider = StateNotifierProvider<QuestionNotifier, List<Map<String, String>>>((ref) {
  return QuestionNotifier();
});

class QuestionNotifier extends StateNotifier<List<Map<String, String>>> {
  QuestionNotifier() : super([]);

  void setQuestions(List<Map<String, String>> questions) {
    state = questions;
  }
}
