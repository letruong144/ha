/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  ChevronRight,
  GraduationCap,
  AlertCircle
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  answer: string;
  part: string;
}

const QUESTIONS: Question[] = [
  // Part 1
  { id: 1, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Đâu là câu lệnh (instruction) chuẩn xác nhất của dạng bài Agree/Disagree?", options: [{ id: "A", text: "Discuss both these views and give your own opinion." }, { id: "B", text: "To what extent do you agree or disagree with this statement?" }, { id: "C", text: "What are the main causes of this problem and what are the solutions?" }, { id: "D", text: "Do the advantages of this outweigh the disadvantages?" }], answer: "B" },
  { id: 2, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Tiêu chí quan trọng nhất định hình dạng bài Agree/Disagree là gì?", options: [{ id: "A", text: "Phải tìm ra nguyên nhân của vấn đề." }, { id: "B", text: "Bắt buộc phải đưa ra một quan điểm cá nhân rõ ràng và xuyên suốt." }, { id: "C", text: "Bắt buộc phải viết chính xác 3 đoạn thân bài." }, { id: "D", text: "Không được phép đưa ví dụ cá nhân." }], answer: "B" },
  { id: 3, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Bạn CÓ THỂ viết theo hướng \"Partially Agree\" (Đồng ý một phần / Cân bằng) trong dạng bài này không?", options: [{ id: "A", text: "Hoàn toàn không, bạn bắt buộc phải nghiêng hẳn về 1 phía." }, { id: "B", text: "Có, nhưng bạn phải làm rõ mức độ đồng ý/phản đối của mình ngay từ Mở bài." }, { id: "C", text: "Có, nhưng không được viết ở Mở bài, chỉ được chốt ở Kết bài." }, { id: "D", text: "Chỉ được làm vậy nếu đề bài có chữ \"Discuss\"." }], answer: "B" },
  { id: 4, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Một bài viết Agree/Disagree chuẩn thường có cấu trúc gồm mấy phần chính?", options: [{ id: "A", text: "Mở bài - Thân bài - Kết bài" }, { id: "B", text: "Mở bài - Nêu nguyên nhân - Nêu giải pháp - Kết bài" }, { id: "C", text: "Mở bài - Lợi ích - Bất lợi - Kết bài" }, { id: "D", text: "Không có quy định cụ thể." }], answer: "A" },
  { id: 5, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Trong đoạn Mở bài (Introduction), hai yếu tố KHÔNG THỂ THIẾU là gì?", options: [{ id: "A", text: "Hook (Câu dẫn dắt) & Background statement." }, { id: "B", text: "Background statement (Paraphrase lại đề) & Thesis statement (Câu nêu quan điểm)." }, { id: "C", text: "Thesis statement & Example (Ví dụ)." }, { id: "D", text: "General knowledge & Conclusion." }], answer: "B" },
  { id: 6, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Chức năng của \"Thesis statement\" là gì?", options: [{ id: "A", text: "Tóm tắt lại toàn bộ các ý phụ sẽ viết." }, { id: "B", text: "Đưa ra lời khuyên cho người đọc." }, { id: "C", text: "Trả lời trực tiếp và rõ ràng câu hỏi/yêu cầu của đề bài." }, { id: "D", text: "Nhắc lại y nguyên câu chữ của đề bài." }], answer: "C" },
  { id: 7, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Đoạn Body (Thân bài) của bài Agree/Disagree nên bắt đầu bằng câu gì?", options: [{ id: "A", text: "Supporting sentence (Câu hỗ trợ)." }, { id: "B", text: "Example (Câu ví dụ)." }, { id: "C", text: "Topic sentence (Câu chủ đề nêu rõ luận điểm của đoạn)." }, { id: "D", text: "Concluding sentence (Câu kết đoạn)." }], answer: "C" },
  { id: 8, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Phần Kết bài (Conclusion) bắt buộc phải có yếu tố nào?", options: [{ id: "A", text: "Đưa ra một luận điểm hoàn toàn mới để gây bất ngờ." }, { id: "B", text: "Nhắc lại (Restate) quan điểm đã nêu ở Mở bài bằng từ ngữ khác." }, { id: "C", text: "Trích dẫn một câu châm ngôn nổi tiếng." }, { id: "D", text: "Liệt kê chi tiết lại tất cả các ví dụ đã dùng." }], answer: "B" },
  { id: 9, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Tuyệt đối KHÔNG NÊN làm gì trong phần Kết bài?", options: [{ id: "A", text: "Dùng từ \"In conclusion\"." }, { id: "B", text: "Khẳng định lại Thesis statement." }, { id: "C", text: "Đưa ra ý tưởng hoặc luận điểm mới chưa từng thảo luận ở Thân bài." }, { id: "D", text: "Tóm tắt ngắn gọn lập luận chính." }], answer: "C" },
  { id: 10, part: "Phần 1: Nhận diện đề & Cấu trúc tổng quan", text: "Nếu bạn chọn hướng \"Strongly Agree\" (Hoàn toàn đồng ý), cấu trúc Thân bài của bạn nên là:", options: [{ id: "A", text: "Body 1 viết về lý do phản đối, Body 2 viết về lý do đồng ý." }, { id: "B", text: "Cả Body 1 và Body 2 đều đưa ra các lý do giải thích tại sao bạn đồng ý." }, { id: "C", text: "Thân bài chỉ gồm 1 đoạn văn rất dài." }, { id: "D", text: "Không cần viết Thân bài, chỉ cần Mở bài và Kết bài dài là đủ." }], answer: "B" },

  // Part 2
  { id: 11, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Cụm từ nào paraphrase tốt nhất cho \"University education\"?", options: [{ id: "A", text: "High school programs" }, { id: "B", text: "Tertiary education / Higher education" }, { id: "C", text: "Primary schooling" }, { id: "D", text: "Universal learning" }], answer: "B" },
  { id: 12, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Cụm từ nào paraphrase tốt nhất cho \"free for everyone\"?", options: [{ id: "A", text: "fully funded by the government for all citizens" }, { id: "B", text: "extremely expensive" }, { id: "C", text: "cheap for the poor" }, { id: "D", text: "restricted to talented students" }], answer: "A" },
  { id: 13, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Đâu là Thesis statement tốt nhất nếu bạn \"Strongly Agree\"?", options: [{ id: "A", text: "I disagree that university should be free because it costs too much." }, { id: "B", text: "Some people think university should be free, but others do not." }, { id: "C", text: "I completely agree with this assertion as it promotes equal opportunities and boosts national progress." }, { id: "D", text: "This essay will discuss the reasons why university is important." }], answer: "C" },
  { id: 14, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Đâu là Thesis statement tốt nhất nếu bạn \"Partially Agree\"?", options: [{ id: "A", text: "I totally agree with this idea." }, { id: "B", text: "I completely object to this trend." }, { id: "C", text: "While I agree that free education helps disadvantaged students, I believe that it would place an unbearable burden on the national economy." }, { id: "D", text: "Education is very important for everyone in the world." }], answer: "C" },
  { id: 15, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Câu nào dưới đây KHÔNG PHẢI là một Thesis statement đạt chuẩn?", options: [{ id: "A", text: "I firmly believe that this is a positive development." }, { id: "B", text: "I completely disagree with the statement provided above." }, { id: "C", text: "In this essay, I will discuss both sides and let you decide." }, { id: "D", text: "I am of the opinion that the drawbacks of this trend overshadow its benefits." }], answer: "C" },
  { id: 16, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Cụm từ nào có thể thay thế cho \"I completely agree\"?", options: [{ id: "A", text: "I wholeheartedly concur" }, { id: "B", text: "I strongly oppose" }, { id: "C", text: "I partially object" }, { id: "D", text: "I am sitting on the fence" }], answer: "A" },
  { id: 17, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Cụm từ nào có thể thay thế cho \"I completely disagree\"?", options: [{ id: "A", text: "I totally support" }, { id: "B", text: "I firmly share this view" }, { id: "C", text: "I am vehemently opposed to this viewpoint" }, { id: "D", text: "I advocate for this" }], answer: "C" },
  { id: 18, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Cấu trúc câu nào thường dùng để dẫn dắt Background statement?", options: [{ id: "A", text: "It is universally accepted that... / It is argued by some that..." }, { id: "B", text: "I think that..." }, { id: "C", text: "My opinion is..." }, { id: "D", text: "Because of this..." }], answer: "A" },
  { id: 19, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Lỗi lớn nhất khi viết Mở bài Agree/Disagree là gì?", options: [{ id: "A", text: "Viết quá 3 câu." }, { id: "B", text: "Không đưa ra quan điểm cá nhân (thiếu Thesis statement)." }, { id: "C", text: "Không dùng từ vựng band 8+." }, { id: "D", text: "Dùng thì hiện tại đơn." }], answer: "B" },
  { id: 20, part: "Phần 2: Mở bài & Khẳng định quan điểm", text: "Từ \"Assertion\" có thể dùng để thay thế cho từ nào trong đề bài?", options: [{ id: "A", text: "People" }, { id: "B", text: "Statement / Opinion" }, { id: "C", text: "Discuss" }, { id: "D", text: "Extent" }], answer: "B" },

  // Part 3
  { id: 21, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Trong một Body paragraph chuẩn, bước ngay sau Topic sentence là gì?", options: [{ id: "A", text: "Chuyển sang đoạn mới." }, { id: "B", text: "Giải thích luận điểm (Explanation) làm rõ ý cho Topic sentence." }, { id: "C", text: "Kết luận lại toàn bài." }, { id: "D", text: "Đưa ra quan điểm trái chiều." }], answer: "B" },
  { id: 22, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Cấu trúc kinh điển P.I.E cho một đoạn văn (Paragraph) là viết tắt của:", options: [{ id: "A", text: "Point - Information - End" }, { id: "B", text: "Point - Illustration - Explanation" }, { id: "C", text: "People - Idea - Environment" }, { id: "D", text: "Paragraph - Introduction - Ending" }], answer: "B" },
  { id: 23, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Trong dạng \"Strongly Agree/Disagree\", nếu bạn muốn viết một đoạn \"Counter-argument\" (Đoạn phản biện), nó có mục đích gì?", options: [{ id: "A", text: "Để tự mâu thuẫn với chính mình." }, { id: "B", text: "Để chứng tỏ bạn bị lạc đề." }, { id: "C", text: "Để công nhận mặt còn lại có ý đúng nhỏ, NHƯNG ngay lập tức bác bỏ nó để làm nổi bật quan điểm chính của bạn." }, { id: "D", text: "Để kéo dài số lượng từ." }], answer: "C" },
  { id: 24, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Nên đưa bao nhiêu luận điểm chính (Main points) vào một đoạn Body paragraph?", options: [{ id: "A", text: "Càng nhiều càng tốt (từ 4-5 ý) để chứng tỏ mình hiểu biết." }, { id: "B", text: "Không cần luận điểm nào cả." }, { id: "C", text: "Chỉ 1 đến 2 ý chính, nhưng được giải thích và cho ví dụ cực kỳ chi tiết." }, { id: "D", text: "Liệt kê ít nhất 10 ý bằng gạch đầu dòng." }], answer: "C" },
  { id: 25, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Lỗi \"Overgeneralization\" (Khái quát hóa quá mức) trong lập luận là gì?", options: [{ id: "A", text: "Dùng những từ tuyệt đối như \"all\", \"always\", \"every\" cho các vấn đề xã hội phức tạp mà không có ngoại lệ." }, { id: "B", text: "Đưa ra ví dụ quá cụ thể." }, { id: "C", text: "Dùng từ vựng quá học thuật." }, { id: "D", text: "Viết câu quá ngắn." }], answer: "A" },
  { id: 26, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Đâu là một ví dụ (Example) hợp lý trong IELTS Writing?", options: [{ id: "A", text: "\"Bạn tôi tên là Nam, hôm qua Nam chơi game và bị điểm kém.\"" }, { id: "B", text: "\"For instance, a recent study by Oxford University revealed that over-reliance on smartphones increases anxiety levels by 30%.\"" }, { id: "C", text: "\"I think games are bad.\"" }, { id: "D", text: "\"Everyone knows that global warming is hot.\"" }], answer: "B" },
  { id: 27, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Sự khác biệt giữa Topic sentence và Supporting sentence là gì?", options: [{ id: "A", text: "Topic sentence nêu ý khái quát của đoạn, Supporting sentence giải thích chi tiết cho ý đó." }, { id: "B", text: "Topic sentence nằm ở cuối đoạn, Supporting sentence nằm ở đầu đoạn." }, { id: "C", text: "Cả hai là một." }, { id: "D", text: "Topic sentence dùng thì quá khứ, Supporting sentence dùng thì tương lai." }], answer: "A" },
  { id: 28, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Cụm từ nào dùng để bắt đầu phần giải thích (Explanation) cho một luận điểm?", options: [{ id: "A", text: "To conclude..." }, { id: "B", text: "This means that... / In other words,..." }, { id: "C", text: "Firstly..." }, { id: "D", text: "However..." }], answer: "B" },
  { id: 29, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Nếu bạn thiếu ý tưởng, phương pháp nào tốt nhất để phát triển độ dài của Body paragraph?", options: [{ id: "A", text: "Viết lặp lại câu trước bằng các từ đồng nghĩa." }, { id: "B", text: "Phân tích sâu theo chuỗi nhân quả: Điều này dẫn đến A, A dẫn đến B, và B mang lại kết quả cuối cùng là C." }, { id: "C", text: "Dịch nguyên một bài báo tiếng Việt sang tiếng Anh." }, { id: "D", text: "Dùng phông chữ to hơn." }], answer: "B" },
  { id: 30, part: "Phần 3: Phát triển ý & Lập luận Thân bài", text: "Lỗi \"Circular reasoning\" (Lập luận vòng vo) là gì?", options: [{ id: "A", text: "Chấm dứt câu bằng dấu chấm." }, { id: "B", text: "Giải thích luận điểm bằng cách lặp lại chính luận điểm đó với từ ngữ khác mà không đưa ra lý do mới." }, { id: "C", text: "Dùng vòng tròn để vẽ sơ đồ." }, { id: "D", text: "Viết các câu ghép dài." }], answer: "B" },

  // Part 4
  { id: 31, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Để nối hai ý BỔ SUNG cho nhau (Addition), từ nối nào là phù hợp?", options: [{ id: "A", text: "Nevertheless" }, { id: "B", text: "Furthermore" }, { id: "C", text: "Consequently" }, { id: "D", text: "Despite" }], answer: "B" },
  { id: 32, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Để nối hai ý TƯƠNG PHẢN (Contrast), từ nối nào là phù hợp?", options: [{ id: "A", text: "In addition" }, { id: "B", text: "As a result" }, { id: "C", text: "Conversely / However" }, { id: "D", text: "Similarly" }], answer: "C" },
  { id: 33, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Để nối ý CHỈ KẾT QUẢ (Result), từ nối nào là phù hợp?", options: [{ id: "A", text: "Because" }, { id: "B", text: "Therefore / As a consequence" }, { id: "C", text: "Although" }, { id: "D", text: "While" }], answer: "B" },
  { id: 34, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Cách dùng dấu câu nào sau đây là ĐÚNG chuẩn ngữ pháp?", options: [{ id: "A", text: "Therefore I believe that..." }, { id: "B", text: "Therefore, I believe that..." }, { id: "C", text: "Therefore; I believe that..." }, { id: "D", text: ",Therefore I believe that..." }], answer: "B" },
  { id: 35, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Từ/Cụm từ nào học thuật hơn để thay thế cho \"bad effects\"?", options: [{ id: "A", text: "Uncool things" }, { id: "B", text: "Not good stuff" }, { id: "C", text: "Detrimental impacts / Adverse repercussions" }, { id: "D", text: "Sad results" }], answer: "C" },
  { id: 36, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Cụm động từ (collocation) nào đúng khi nói về \"gây ra vấn đề\"?", options: [{ id: "A", text: "Make a problem" }, { id: "B", text: "Do a problem" }, { id: "C", text: "Pose a threat / Give rise to an issue" }, { id: "D", text: "Have a problem" }], answer: "C" },
  { id: 37, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Từ vựng nào mang tính trang trọng (formal) để thay thế cho \"people\"?", options: [{ id: "A", text: "Guys" }, { id: "B", text: "Individuals / Citizens" }, { id: "C", text: "Folks" }, { id: "D", text: "Humans beings (sai lỗi chính tả)" }], answer: "B" },
  { id: 38, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Cấu trúc câu nhượng bộ nào sau đây ĐÚNG ngữ pháp?", options: [{ id: "A", text: "Although it is raining, but I still go to school." }, { id: "B", text: "Despite of the rain, I still go to school." }, { id: "C", text: "While there are undeniable drawbacks, the benefits are far more significant." }, { id: "D", text: "Because it is raining, so I stay at home." }], answer: "C" },
  { id: 39, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Giới từ nào đi kèm đúng với từ \"impact\" hoặc \"effect\"?", options: [{ id: "A", text: "in" }, { id: "B", text: "on (have an impact/effect ON something)" }, { id: "C", text: "at" }, { id: "D", text: "with" }], answer: "B" },
  { id: 40, part: "Phần 4: Từ vựng & Công cụ Liên kết", text: "Tránh dùng đại từ nhân xưng nào quá nhiều trong bài học thuật (ngoại trừ khi nêu quan điểm)?", options: [{ id: "A", text: "It" }, { id: "B", text: "They" }, { id: "C", text: "You / We (Nên dùng cấu trúc bị động hoặc đại từ bất định thay thế)." }, { id: "D", text: "He/She" }], answer: "C" },

  // Part 5
  { id: 41, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Lạc đề (Off-topic) hoặc không trả lời đủ ý đề bài sẽ khiến bạn mất điểm nặng ở tiêu chí nào?", options: [{ id: "A", text: "Task Response" }, { id: "B", text: "Coherence and Cohesion" }, { id: "C", text: "Lexical Resource" }, { id: "D", text: "Grammatical Range and Accuracy" }], answer: "A" },
  { id: 42, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Việc lặp đi lặp lại một từ vựng (ví dụ: dùng từ \"important\" 10 lần) sẽ bị trừ điểm ở tiêu chí nào?", options: [{ id: "A", text: "Task Response" }, { id: "B", text: "Coherence and Cohesion" }, { id: "C", text: "Lexical Resource" }, { id: "D", text: "Grammatical Range and Accuracy" }], answer: "C" },
  { id: 43, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Nếu bài viết của bạn thiếu tính logic giữa các đoạn, không dùng từ nối, giám khảo sẽ trừ điểm tiêu chí:", options: [{ id: "A", text: "Task Response" }, { id: "B", text: "Coherence and Cohesion" }, { id: "C", text: "Lexical Resource" }, { id: "D", text: "Grammatical Range and Accuracy" }], answer: "B" },
  { id: 44, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Giọng văn (Tone) chuẩn mực nhất cho IELTS Writing Task 2 là gì?", options: [{ id: "A", text: "Informal (Suồng sã, thân mật)." }, { id: "B", text: "Formal, objective and academic (Trang trọng, khách quan và học thuật)." }, { id: "C", text: "Emotional (Cảm xúc, dùng nhiều dấu chấm than)." }, { id: "D", text: "Humorous (Hài hước)." }], answer: "B" },
  { id: 45, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Có nên dùng các dạng viết tắt (Contractions) như don't, can't, won't trong Task 2 không?", options: [{ id: "A", text: "Có, để bài viết trông tự nhiên như người bản xứ." }, { id: "B", text: "Không, bắt buộc phải viết đầy đủ là do not, cannot, will not trong văn phong học thuật." }, { id: "C", text: "Tùy vào cảm xúc người viết." }, { id: "D", text: "Chỉ được dùng ở phần Mở bài." }], answer: "B" },
  { id: 46, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Mức điểm ngữ pháp (Grammar) cao yêu cầu bạn phải:", options: [{ id: "A", text: "Chỉ viết toàn câu đơn cho chắc chắn không sai." }, { id: "B", text: "Dùng càng nhiều thì hiện tại hoàn thành tiếp diễn càng tốt." }, { id: "C", text: "Sử dụng linh hoạt và chính xác sự kết hợp giữa câu đơn, câu ghép và câu phức (Complex sentences)." }, { id: "D", text: "Không được dùng dấu phẩy." }], answer: "C" },
  { id: 47, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Bạn viết một bài rất dài (hơn 400 từ) nhưng chữ viết tay quá xấu không thể đọc được. Kết quả sẽ thế nào?", options: [{ id: "A", text: "Vẫn điểm cao vì viết dài." }, { id: "B", text: "Giám khảo sẽ cố dịch từng chữ." }, { id: "C", text: "Bài viết sẽ bị đánh giá thấp hoặc không có điểm phần không đọc được (Illegible handwriting)." }, { id: "D", text: "Được cộng điểm nỗ lực." }], answer: "C" },
  { id: 48, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Nếu bạn copy y nguyên (copy-paste) một đoạn văn mẫu dài học thuộc lòng vào bài thi, điều gì sẽ xảy ra?", options: [{ id: "A", text: "Đạt điểm 9.0 tuyệt đối." }, { id: "B", text: "Giám khảo sẽ nhận ra sự bất thường về văn phong và trừ điểm nặng (Memorised language penalty)." }, { id: "C", text: "Không ảnh hưởng gì." }, { id: "D", text: "Bạn sẽ được khen ngợi." }], answer: "B" },
  { id: 49, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Thời gian phân bổ hợp lý nhất cho Writing Task 2 (chiếm 2/3 tổng điểm Writing) là bao nhiêu?", options: [{ id: "A", text: "10 phút lập dàn ý, 10 phút viết." }, { id: "B", text: "40 phút (Khoảng 5p lập dàn ý, 30p viết, 5p kiểm tra lại)." }, { id: "C", text: "60 phút." }, { id: "D", text: "20 phút." }], answer: "B" },
  { id: 50, part: "Phần 5: Tiêu chí chấm điểm & Các lỗi \"Trí mạng\"", text: "Chìa khóa \"vàng\" quyết định điểm số của một bài Agree/Disagree là gì?", options: [{ id: "A", text: "Nhồi nhét thật nhiều \"big words\" (từ vựng hiếm) dù không hiểu rõ cách dùng." }, { id: "B", text: "Quan điểm nhất quán từ đầu đến cuối, luận điểm được phát triển logic, rõ ràng với ngữ pháp/từ vựng tự nhiên." }, { id: "C", text: "Viết dài trên 500 từ." }, { id: "D", text: "Dùng thật nhiều Idiom (Thành ngữ)." }], answer: "B" },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 for landing page
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleStart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsFinished(false);
    setFeedback(null);
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionId: string) => {
    if (feedback) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || feedback) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  const finalScore = useMemo(() => {
    return (correctCount / QUESTIONS.length) * 10;
  }, [correctCount]);

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center border border-black/5"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <GraduationCap className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
            IELTS Writing Task 2 Master Quiz
          </h1>
          <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
            Kiểm tra kiến thức của bạn về dạng bài <b>Agree/Disagree</b>. 
            Bộ câu hỏi gồm 50 câu chia làm 5 phần chuyên sâu.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Số câu hỏi</p>
              <p className="text-xl font-bold text-zinc-800">50 Câu</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Thang điểm</p>
              <p className="text-xl font-bold text-zinc-800">10.0</p>
            </div>
          </div>
          <button 
            onClick={handleStart}
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-200"
          >
            Bắt đầu làm bài
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-sm p-8 md:p-12 text-center border border-black/5"
        >
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <Trophy className="w-12 h-12 text-amber-500" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-amber-200 rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Kết quả bài tập</h2>
          <p className="text-zinc-500 mb-8">Bạn đã hoàn thành 50 câu hỏi về IELTS Writing Task 2</p>
          
          <div className="bg-zinc-50 rounded-3xl p-8 mb-8 border border-zinc-100">
            <div className="flex justify-between items-center mb-6">
              <div className="text-left">
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Điểm số</p>
                <p className="text-5xl font-black text-zinc-900">{finalScore.toFixed(1)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Đúng</p>
                <p className="text-3xl font-bold text-emerald-600">{correctCount}/50</p>
              </div>
            </div>
            <div className="w-full bg-zinc-200 h-3 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(correctCount / 50) * 100}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleStart}
              className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Làm lại từ đầu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 leading-tight">IELTS Master Quiz</h3>
              <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">Agree / Disagree</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tiến độ</p>
              <p className="text-sm font-bold text-zinc-900">{currentIndex + 1} / 50</p>
            </div>
            <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-zinc-900"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Question Header */}
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {currentQuestion.part}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={!!feedback}
                  className={`
                    group w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4
                    ${selectedOption === option.id 
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-md' 
                      : 'border-white bg-white hover:border-zinc-200 text-zinc-700'}
                    ${feedback && option.id === currentQuestion.answer && feedback === 'incorrect' ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}
                  `}
                >
                  <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
                    ${selectedOption === option.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'}
                  `}>
                    {option.id}
                  </span>
                  <span className="text-base font-medium leading-snug">{option.text}</span>
                </button>
              ))}
            </div>

            {/* Feedback & Actions */}
            <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-2xl ${
                      feedback === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {feedback === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <span className="font-bold">Chính xác!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 shrink-0" />
                        <span className="font-bold">Sai rồi!</span>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                {!feedback ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="w-full sm:w-48 py-4 bg-zinc-900 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-48 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-200"
                  >
                    {currentIndex === QUESTIONS.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="p-6 text-center text-zinc-400 text-xs font-medium uppercase tracking-widest">
        IELTS Writing Task 2 • Agree/Disagree Structure & Logic
      </footer>
    </div>
  );
}
