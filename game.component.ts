import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Question,
  QuestionType,
  SlidesData,
} from '../interfaces/question.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() data!: SlidesData;
  public question: Question[] | undefined;
  public types = Object.values(QuestionType);
  public type = QuestionType.FRENZY;
  public redTeam = {
    name: 'Red Team',
    score: 0,
  };
  public blueTeam = {
    name: 'Blue Team',
    score: 0,
  };
  public scoreSum = 0;

  constructor(private dialog: MatDialog) {}

  public addScore(team: string): void {
    if (!this.question) {
      return;
    }

    if (team === 'red') {
      this.redTeam.score += this.question[0].partialPoints;
      this.scoreSum += this.question[0].partialPoints;
      return;
    }

    if (team === 'blue') {
      this.blueTeam.score += this.question[0].partialPoints;
      this.scoreSum += this.question[0].partialPoints;
      return;
    }
  }

  public getQuestion(templateRef: any): void {
    if (
      this.question &&
      this.question[0].maxPoints > this.scoreSum &&
      this.question[0].type !== QuestionType.FRENZY
    ) {
      this.dialog
        .open(templateRef)
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.setQuestion();
          }
        });
    } else {
      this.setQuestion();
    }
  }

  private setQuestion(): void {
    let question;
    switch (this.type) {
      case QuestionType.EASY:
        question = this.getRandomQuestion(this.data.easy);
        break;
      case QuestionType.MEDIUM:
        question = this.getRandomQuestion(this.data.medium);
        break;
      case QuestionType.HARD:
        question = this.getRandomQuestion(this.data.hard);
        break;
      case QuestionType.VERY_HARD:
        question = this.getRandomQuestion(this.data.veryHard);
        break;
      case QuestionType.FRENZY:
        question = this.getRandomQuestion(this.data.frenzy);
        break;
    }

    if (question) {
      question.done = true;
      this.question = [question];
      this.scoreSum = 0;
    }
  }

  private getRandomQuestion(data: Question[]): Question | null {
    const notDone = data
      .map((value) => {
        if (!value.done) {
          return value;
        }
        return;
      })
      .filter(Boolean) as Question[];

    if (!notDone.length) {
      this.question = undefined;
      return null;
    }

    const question = notDone[Math.floor(Math.random() * notDone.length)];
    return question;
  }
}
