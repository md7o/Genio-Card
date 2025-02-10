import 'package:flutter_riverpod/flutter_riverpod.dart';

final numQuestionsProvider = StateProvider<String>((ref) => '1');
final languageProvider = StateProvider<String>((ref) => 'English');
final difficultyProvider = StateProvider<String>((ref) => 'Simple');
